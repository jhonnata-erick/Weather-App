import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { openmeteoParamsToURL, openmeteoStaleTime } from "./openmeteo.ts";
import type { OpenMeteoParams } from "../types/app-types.ts";

describe("openmeteoParamsToURL({lat: number, lon:number}) function", () => {
  it("Should return https://api.open-meteo.com/v1/forecast?latitude=0&longitude=0&daily=temperature_2m_max,temperature_2m_min,moon_phase,precipitation_probability_max,weather_code,uv_index_max,sunrise,sunset,uv_index_clear_sky_max&hourly=precipitation_probability,snow_depth,cloud_cover,visibility,uv_index,weather_code,surface_pressure,showers,temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,rain,snowfall,wind_speed_10m,wind_gusts_10m,wind_direction_10m&models=best_match&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,surface_pressure,cloud_cover,wind_speed_10m,wind_gusts_10m,wind_direction_10m,is_day&timezone=auto&past_days=1&forecast_days=14&forecast_hours=12&past_hours=6&forecast_minutely_15=48&past_minutely_15=24", () => {
    const endpoint = "https://api.open-meteo.com/v1/forecast";

    const params: OpenMeteoParams = {
      latitude: 0,
      longitude: 0,
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "moon_phase",
        "precipitation_probability_max",
        "weather_code",
        "uv_index_max",
        "sunrise",
        "sunset",
        "uv_index_clear_sky_max",
      ],
      hourly: [
        "precipitation_probability",
        "snow_depth",
        "cloud_cover",
        "visibility",
        "uv_index",
        "weather_code",
        "surface_pressure",
        "showers",
        "temperature_2m",
        "relative_humidity_2m",
        "dew_point_2m",
        "apparent_temperature",
        "rain",
        "snowfall",
        "wind_speed_10m",
        "wind_gusts_10m",
        "wind_direction_10m",
      ],
      models: "best_match",
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "precipitation",
        "rain",
        "showers",
        "snowfall",
        "weather_code",
        "surface_pressure",
        "cloud_cover",
        "wind_speed_10m",
        "wind_gusts_10m",
        "wind_direction_10m",
        "is_day",
      ],
      timezone: "auto",
      past_days: 1,
      forecast_days: 14,
      forecast_hours: 12,
      past_hours: 6,
      forecast_minutely_15: 48,
      past_minutely_15: 24,
    };
    expect(openmeteoParamsToURL(endpoint, { lat: 0, lon: 0 }, params)).toBe(
      "https://api.open-meteo.com/v1/forecast?latitude=0&longitude=0&daily=temperature_2m_max,temperature_2m_min,moon_phase,precipitation_probability_max,weather_code,uv_index_max,sunrise,sunset,uv_index_clear_sky_max&hourly=precipitation_probability,snow_depth,cloud_cover,visibility,uv_index,weather_code,surface_pressure,showers,temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,rain,snowfall,wind_speed_10m,wind_gusts_10m,wind_direction_10m&models=best_match&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,surface_pressure,cloud_cover,wind_speed_10m,wind_gusts_10m,wind_direction_10m,is_day&timezone=auto&past_days=1&forecast_days=14&forecast_hours=12&past_hours=6&forecast_minutely_15=48&past_minutely_15=24",
    );
  });
  it("Should return https://api.open-meteo.com/v1/forecast?latitude=0&longitude=0&daily=temperature_2m_max&hourly=precipitation_probability&models=best_match&current=temperature_2m&timezone=auto&past_days=1&forecast_days=14&forecast_hours=12&past_hours=6&forecast_minutely_15=48&past_minutely_15=24", () => {
    const endpoint = "https://api.open-meteo.com/v1/forecast";
    const params: OpenMeteoParams = {
      latitude: 0,
      longitude: 0,
      daily: ["temperature_2m_max"],
      hourly: ["precipitation_probability"],
      models: ["best_match"],
      current: ["temperature_2m"],
      timezone: "auto",
      past_days: 1,
      forecast_days: 14,
      forecast_hours: 12,
      past_hours: 6,
      forecast_minutely_15: 48,
      past_minutely_15: 24,
    };
    expect(openmeteoParamsToURL(endpoint, { lat: 0, lon: 0 }, params)).toBe(
      "https://api.open-meteo.com/v1/forecast?latitude=0&longitude=0&daily=temperature_2m_max&hourly=precipitation_probability&models=best_match&current=temperature_2m&timezone=auto&past_days=1&forecast_days=14&forecast_hours=12&past_hours=6&forecast_minutely_15=48&past_minutely_15=24",
    );
  });
  it("Should return https://api.open-meteo.com/v1/forecast?latitude=0&longitude=0&timezone=auto&past_days=1&forecast_days=14&forecast_hours=12&past_hours=6&forecast_minutely_15=48&past_minutely_15=24", () => {
    const endpoint = "https://api.open-meteo.com/v1/forecast";
    const params: OpenMeteoParams = {
      latitude: 0,
      longitude: 0,
      timezone: "auto",
      past_days: 1,
      forecast_days: 14,
      forecast_hours: 12,
      past_hours: 6,
      forecast_minutely_15: 48,
      past_minutely_15: 24,
    };
    expect(openmeteoParamsToURL(endpoint, { lat: 0, lon: 0 }, params)).toBe(
      "https://api.open-meteo.com/v1/forecast?latitude=0&longitude=0&timezone=auto&past_days=1&forecast_days=14&forecast_hours=12&past_hours=6&forecast_minutely_15=48&past_minutely_15=24",
    );
  });
});
describe("openmeteoStaleTime()", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it("Should return 300 seconds", () => {
    vi.setSystemTime(new Date("2011-10-10T10:10:00"));

    expect(openmeteoStaleTime()).toBe(300);
  });
  it("Should return 180 seconds", () => {
    vi.setSystemTime(new Date("2011-10-10T10:27:00"));

    expect(openmeteoStaleTime()).toBe(180);
  });
  it("Should return 265 seconds", () => {
    vi.setSystemTime(new Date("2011-10-10T10:40:35"));

    expect(openmeteoStaleTime()).toBe(265);
  });
  it("Should return 39 seconds", () => {
    vi.setSystemTime(new Date("2011-10-10T10:44:21"));

    expect(openmeteoStaleTime()).toBe(39);
  });
  it("Should return 60 seconds", () => {
    vi.setSystemTime(new Date("2011-10-10T10:59:00"));

    expect(openmeteoStaleTime()).toBe(1 * 60);
  });
  it(`Should return ${15 * 60} seconds`, () => {
    vi.setSystemTime(new Date("2011-10-10T10:30:00"));
    expect(openmeteoStaleTime()).toBe(15 * 60);
  });
});
