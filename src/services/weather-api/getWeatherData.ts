import { fetchWeatherApi } from "openmeteo";
import type { OpenMeteoResponse } from "../../types/app-types.ts";
interface location {
  lat: number;
  lon: number;
}
export async function getWeatherData({
  lat,
  lon,
}: location): Promise<OpenMeteoResponse> {
  const params = {
    latitude: lat,
    longitude: lon,
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "moon_phase",
      "precipitation_probability_max",
      "weather_code",
    ],
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation_probability",
      "precipitation",
      "rain",
      "snowfall",
      "snow_depth",
      "cloud_cover",
      "visibility",
      "temperature_80m",
      "temperature_120m",
      "temperature_180m",
      "uv_index",
      "is_day",
      "weather_code",
    ],
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "precipitation",
      "rain",
      "weather_code",
      "cloud_cover",
      "snowfall",
    ],
    timezone: "auto",
    forecast_hours: 24,
  };
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=-23.5475&longitude=-46.6361&daily=temperature_2m_max,temperature_2m_min,moon_phase,precipitation_probability_max,weather_code,uv_index_max,sunrise,sunset,uv_index_clear_sky_max&hourly=precipitation_probability,snow_depth,cloud_cover,visibility,uv_index,weather_code,surface_pressure,pressure_msl,showers&models=best_match&minutely_15=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,wind_speed_10m,wind_gusts_10m,visibility,is_day&timezone=auto&past_days=1&forecast_days=14&forecast_hours=12&past_hours=6&forecast_minutely_15=48&past_minutely_15=24";

  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];
  if (!response) {
    throw new Error("No response from api");
  } else {
    return response;
  }
}
