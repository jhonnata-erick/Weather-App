import { afterEach, describe, expect, it, vi } from "vitest";
import type {
  Address,
  OpenMeteoResponse,
} from "../types/app-types.ts";
import { currentLocAdapter } from "./currentLoc.adapter.ts";

describe("currentLocAdapter", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("adapts the address and current weather location details", async () => {
    const queriedAt = new Date("2026-10-16T21:00:00");
    vi.useFakeTimers();
    vi.setSystemTime(queriedAt);

    const address: Address = {
      house_number: "62",
      road: "Praça do Patriarca",
      suburb: "Glicério",
      city: "São Paulo",
      state: "São Paulo",
      "ISO3166-2-lvl4": "BR-SP",
      region: "Região Sudeste",
      postcode: "01002-010",
      country: "Brasil",
      country_code: "br",
    };
    const weatherResponse = {
      latitude: -23.55,
      longitude: -46.63,
      current: { time: "2026-10-16T14:45:00" },
    } as OpenMeteoResponse;

    await expect(
      currentLocAdapter(address, weatherResponse),
    ).resolves.toEqual({
      id: "-23.55-46.63",
      name: "São Paulo",
      city: "São Paulo",
      state: "São Paulo",
      country: "Brasil",
      time: `${new Date(weatherResponse.current.time).toDateString()}, ${new Date(weatherResponse.current.time).toTimeString().slice(0, 5)}`,
      location: { lat: -23.55, lon: -46.63 },
      timesQueried: queriedAt.getTime(),
    });
  });
});
