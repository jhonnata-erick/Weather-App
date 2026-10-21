import type { OpenMeteoParams } from "../types/app-types.ts";

export const endpoint = "https://api.open-meteo.com/v1/forecast";
export const params: OpenMeteoParams = {
  latitude: 0,
  longitude: 0,
  daily: [
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_probability_max",
    "weather_code",
    "sunrise",
    "sunset",
  ],
  hourly: [
    "precipitation_probability",
    "weather_code",
    "temperature_2m",
  ],
  models: "best_match",
  current: [
    "temperature_2m",
    "apparent_temperature",
    "weather_code",
    "is_day",
  ],
  timezone: "auto",
  past_days: 1,
  forecast_days: 14,
  forecast_hours: 12,
  past_hours: 6,
};

export function openmeteoStaleTime(): number {
  const omMin = [0, 15, 30, 45, 60];
  let stale: number = NaN;
  omMin.forEach((m) => {
    const date = new Date();
    const currentMinute = date.getMinutes() + date.getSeconds() / 60;
    const difference = currentMinute * 60 - m * 60;
    if (Number.isNaN(stale) && difference < 0) {
      stale = difference * -1;
    }
  });

  return stale;
}
