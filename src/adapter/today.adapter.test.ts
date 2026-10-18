import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type {
  OpenMeteoCurrently,
  OpenMeteoDaily,
  OpenMeteoHourly,
  OpenMeteoResponse,
} from "../types/app-types.ts";
import { getWMOcode } from "../services/getData/getWMOcode.ts";
import { today_adapter } from "./today.adapter.ts";

vi.mock("../services/getData/getWMOcode.ts", () => ({
  getWMOcode: vi.fn(async (code?: number) => {
    const descriptions: Record<number, string> = {
      0: "Clear sky",
      3: "Partly cloudy",
      61: "Rain",
    };
    return code ? descriptions[code]! : descriptions;
  }),
}));

describe("today_adapter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-16T12:30:00"));
    vi.mocked(getWMOcode).mockClear();
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("adapts current conditions and ordered hourly and daily forecasts", async () => {
    const current = {
      time: "2026-10-16T12:30:00",
      temperature_2m: 21.7,
      apparent_temperature: 20.4,
      weather_code: 3,
      is_day: 1,
      precipitation: 25,
    } as OpenMeteoCurrently;
    const hourly = {
      time: [
        "2026-10-16T10:00:00",
        "2026-10-16T13:00:00",
        "2026-10-16T19:00:00",
      ],
      temperature_2m: [18.6, 22.2, 16.4],
      weather_code: [61, 3, 0],
      precipitation_probability: [40, 20, 0],
    } as OpenMeteoHourly;
    const daily = {
      time: ["2026-10-16", "2026-10-17"],
      sunrise: ["2026-10-15T06:00:00", "2026-10-16T06:00:00"],
      sunset: ["2026-10-15T18:00:00", "2026-10-16T18:00:00"],
      temperature_2m_max: [24.5, 23.2],
      temperature_2m_min: [14.5, 13.4],
      precipitation_probability_max: [50, 10],
      weather_code: [61, 0],
    } as OpenMeteoDaily;
    const weatherData = {
      timezone: "UTC",
      current: current,
      hourly: hourly,
      daily: daily,
    } as OpenMeteoResponse;
    await expect(today_adapter(weatherData)).resolves.toEqual({
      current: {
        date: new Date(current.time).toDateString(),
        temperature: 22,
        weather_code: 3,
        isDay: 1,
        weather_status: "Partly cloudy",
        feelslike: 20,
      },
      hourly: [
        {
          hour: "06:00",
          temperature: "Sunrise",
          weather_code: 200,
          past: true,
          isDay: false,
          precipitation_chance: 0,
        },
        {
          hour: "10:00",
          temperature: "19°",
          weather_code: 61,
          past: true,
          isDay: true,
          precipitation_chance: 40,
        },
        {
          hour: "Now",
          temperature: "22°",
          weather_code: 3,
          past: false,
          isDay: true,
          precipitation_chance: 0,
        },
        {
          hour: "13:00",
          temperature: "22°",
          weather_code: 3,
          past: false,
          isDay: true,
          precipitation_chance: 20,
        },
        {
          hour: "18:00",
          temperature: "Sunset",
          weather_code: 300,
          past: false,
          isDay: false,
          precipitation_chance: 0,
        },
        {
          hour: "19:00",
          temperature: "16°",
          weather_code: 0,
          past: false,
          isDay: false,
          precipitation_chance: 0,
        },
      ],
      daily: [
        {
          dayOfWeek: "Today",
          day: new Date(daily.time[0]!).getDate(),
          max_temperature: "25°",
          min_temperature: "15°",
          precipitation_chance: "50%",
          description: "Rain",
          weather_code: 61,
        },
        {
          dayOfWeek: "Saturday",
          day: new Date(daily.time[1]!).getDate(),
          max_temperature: "23°",
          min_temperature: "13°",
          precipitation_chance: "10%",
          description: "Clear sky",
          weather_code: 0,
        },
      ],
    });

    expect(getWMOcode).toHaveBeenCalledTimes(1);
  });
});
