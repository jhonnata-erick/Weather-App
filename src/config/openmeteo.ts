import type { ApiParams, location } from "../types/app-types.ts";

const endpoint = "https://api.open-meteo.com/v1/forecast";

const params: ApiParams = {
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
export function openmeteoParamsToURL({ lat, lon }: location) {
  const { daily, hourly, current } = params;
  const paramsArray = Object.entries({
    ...params,
    latitude: lat,
    longitude: lon,
    daily: daily.toString(),
    hourly: hourly.toString(),
    current: current.toString(),
  });
  const paramsURL = paramsArray.map((value) => value.join("=")).join("&");
  return endpoint + "?" + paramsURL;
}
export function openmeteoStaleTime(): number {
  const date = new Date();
  const currentMinute = date.getUTCMinutes();
  const openmeteoMinutes = [0, 15, 30, 45, 59.99];
  let stale: number = 0;

  openmeteoMinutes.forEach((m) => {
    const openmeteoStale =
      stale === 0 && currentMinute - m <= 0 ? (currentMinute - m) * -1 : 0;
    stale = openmeteoStale;
  });

  return stale * 60;
}
