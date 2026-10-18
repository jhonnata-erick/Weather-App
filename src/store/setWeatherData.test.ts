import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type {
  Address,
  locationInfo,
  OpenMeteoResponse,
  TodayForecast,
} from "../types/app-types.ts";
import { getGeocodingData } from "../services/getData/getLocationName.ts";
import { getWeatherData } from "../services/getData/getWeatherData.ts";
import { currentLocAdapter } from "../adapter/currentLoc.adapter.ts";
import { today_adapter } from "../adapter/today.adapter.ts";
import useWeatherStore from "./weatherStore.ts";

vi.mock("../services/getData/getLocationName.ts", () => ({
  getGeocodingData: vi.fn(),
}));
vi.mock("../services/getData/getWeatherData.ts", () => ({
  getWeatherData: vi.fn(),
}));
vi.mock("../adapter/currentLoc.adapter.ts", () => ({
  currentLocAdapter: vi.fn(),
}));
vi.mock("../adapter/today.adapter.ts", () => ({
  today_adapter: vi.fn(),
}));

const location = { lat: -23.55, lon: -46.63 };
const address: Address = {
  house_number: "62",
  road: "Praça do Patriarca",
  suburb: "Glicério",
  city: "São Paulo",
  city_district: "Sé",
  state: "São Paulo",
  "ISO3166-2-lvl4": "BR-SP",
  region: "Região Sudeste",
  postcode: "01002-010",
  country: "Brasil",
  country_code: "br",
};
const weatherResponse = {
  latitude: location.lat,
  longitude: location.lon,
  current: {},
  hourly: {},
  daily: {},
} as OpenMeteoResponse;
const todayForecast = {
  current: {
    date: "Fri Oct 16 2026",
    temperature: 25,
    weather_code: 3,
    isDay: 1,
    weather_status: "Clear sky",
    feelslike: 26,
  },
  hourly: [],
  daily: [],
} satisfies TodayForecast;
const currentLocation: locationInfo = {
  id: "location-1",
  name: "São Paulo",
  city: "São Paulo",
  state: "São Paulo",
  country: "Brasil",
  time: "Fri Oct 16 2026, 14:45",
  location,
  timesQueried: 1,
};

function mockSuccessfulDependencies() {
  vi.mocked(getGeocodingData).mockResolvedValue(address);
  vi.mocked(getWeatherData).mockResolvedValue(weatherResponse);
  vi.mocked(today_adapter).mockResolvedValue(todayForecast);
  vi.mocked(currentLocAdapter).mockResolvedValue(currentLocation);
}

describe("setWeatherData", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    localStorage.clear();
    useWeatherStore.setState(useWeatherStore.getInitialState(), true);
    mockSuccessfulDependencies();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads data and updates the forecast, location, and history", async () => {
    await useWeatherStore.getState().setWeatherData(location);

    const state = useWeatherStore.getState();
    expect(state.status).toBe("success");
    expect(state.error).toBeNull();
    expect(state.todayForecast).toEqual(todayForecast);
    expect(state.currentLoc).toEqual(currentLocation);
    expect(state.locationsHistory).toEqual([currentLocation]);
    expect(JSON.parse(localStorage.getItem("searchHistory")!)).toEqual([
      currentLocation,
    ]);

    expect(getGeocodingData).toHaveBeenCalledWith(location);
    expect(getWeatherData).toHaveBeenCalledWith(location);
    expect(today_adapter).toHaveBeenCalledWith(weatherResponse);
    expect(currentLocAdapter).toHaveBeenCalledWith(address, weatherResponse);
  });

  it("updates an existing location in history instead of duplicating it", async () => {
    const oldEntry = { ...currentLocation, timesQueried: 0 };
    localStorage.setItem("searchHistory", JSON.stringify([oldEntry]));
    useWeatherStore.setState({ locationsHistory: [oldEntry] });

    await useWeatherStore.getState().setWeatherData(location);

    expect(useWeatherStore.getState().locationsHistory).toEqual([
      currentLocation,
    ]);
    expect(JSON.parse(localStorage.getItem("searchHistory")!)).toEqual([
      currentLocation,
    ]);
  });

  it("sets an error state if geocoding fails and skips the weather request", async () => {
    vi.mocked(getGeocodingData).mockRejectedValue(
      new Error("Geocoding failed"),
    );

    await useWeatherStore.getState().setWeatherData(location);

    expect(useWeatherStore.getState().status).toBe("error");
    expect(useWeatherStore.getState().error).toEqual({
      name: "",
      url: "",
      status: 0,
      reason: "Error: Geocoding failed",
      instance: "",
    });
    expect(getWeatherData).not.toHaveBeenCalled();
  });
});
