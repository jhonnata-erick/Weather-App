import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  getGeocodingData,
  getSearchLocation,
  getWeatherData,
  getWMOcode,
} from "./getData/api.ts";

const server = setupServer();

const location = { lat: -23.55, lon: -46.63 };

const failRequest = (url: string) => {
  server.use(
    http.get(url, () =>
      HttpResponse.json(
        { message: "Upstream request failed" },
        { status: 503 },
      ),
    ),
  );
};

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

beforeEach(() => {
  server.resetHandlers();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe("getData API services", () => {
  it("getGeocodingData requests reverse geocoding and returns the address", async () => {
    const address = {
      city: "São Paulo",
      state: "São Paulo",
      country: "Brasil",
    };
    let requestedUrl: URL | undefined;
    server.use(
      http.get("https://nominatim.openstreetmap.org/reverse", ({ request }) => {
        requestedUrl = new URL(request.url);
        return HttpResponse.json({ address });
      }),
    );

    await expect(getGeocodingData(location)).resolves.toEqual(address);
    expect(requestedUrl?.searchParams.get("format")).toBe("jsonv2");
    expect(requestedUrl?.searchParams.get("lat")).toBe(String(location.lat));
    expect(requestedUrl?.searchParams.get("lon")).toBe(String(location.lon));
    expect(requestedUrl?.searchParams.get("layer")).toBe("address");
  });

  it("getSearchLocation encodes and sends the requested city query", async () => {
    const results = {
      results: [
        { id: 1, name: "São Paulo", latitude: -23.55, longitude: -46.63 },
      ],
    };
    let requestedUrl: URL | undefined;
    server.use(
      http.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        ({ request }) => {
          requestedUrl = new URL(request.url);
          return HttpResponse.json(results);
        },
      ),
    );

    await expect(getSearchLocation("São Paulo")).resolves.toEqual(results);
    expect(requestedUrl?.searchParams.get("name")).toBe("São Paulo");
    expect(requestedUrl?.searchParams.get("count")).toBe("10");
    expect(requestedUrl?.searchParams.get("language")).toBe("en");
    expect(requestedUrl?.searchParams.get("format")).toBe("json");
  });

  it("getWeatherData sends the coordinates and returns the forecast", async () => {
    const weather = {
      latitude: location.lat,
      longitude: location.lon,
      current: { temperature_2m: 25 },
      hourly: { temperature_2m: [24, 25] },
      daily: { temperature_2m_max: [27] },
    };
    let requestedUrl: URL | undefined;
    server.use(
      http.get("https://api.open-meteo.com/v1/forecast", ({ request }) => {
        requestedUrl = new URL(request.url);
        return HttpResponse.json(weather);
      }),
    );

    await expect(getWeatherData(location)).resolves.toEqual(weather);
    expect(requestedUrl?.searchParams.get("latitude")).toBe(
      String(location.lat),
    );
    expect(requestedUrl?.searchParams.get("longitude")).toBe(
      String(location.lon),
    );
    expect(requestedUrl?.searchParams.get("current")).toContain(
      "temperature_2m",
    );
    expect(requestedUrl?.searchParams.get("hourly")).toContain(
      "temperature_2m",
    );
    expect(requestedUrl?.searchParams.get("daily")).toContain(
      "temperature_2m_max",
    );
  });

  it("getWMOcode returns the description for a weather code", async () => {
    server.use(
      http.get("*/wmocode.json", ({ request }) => {
        expect(new URL(request.url).pathname).toBe("/wmocode.json");
        return HttpResponse.json({ 0: "Clear sky", 61: "Rain" });
      }),
    );

    await expect(getWMOcode(61)).resolves.toBe("Rain");
  });

  it.each([
    {
      name: "getGeocodingData",
      url: "https://nominatim.openstreetmap.org/reverse",
      call: () => getGeocodingData(location),
    },
    {
      name: "getSearchLocation",
      url: "https://geocoding-api.open-meteo.com/v1/search",
      call: () => getSearchLocation("London"),
    },
    {
      name: "getWeatherData",
      url: "https://api.open-meteo.com/v1/forecast",
      call: () => getWeatherData(location),
    },
    {
      name: "getWMOcode",
      url: "*/wmocode.json",
      call: () => getWMOcode(61),
    },
  ])(
    "$name throws HttpError for a non-success response",
    async ({ url, call }) => {
      failRequest(url);

      await expect(call()).rejects.toMatchObject({
        name: "HTTP Error",
        message: "Upstream request failed",
        status: 503,
        reason: "Upstream request failed",
      });
    },
  );
});
