import { fetchWeatherApi } from "openmeteo";
interface location {
  lat: number;
  lon: number;
}
export async function getWeatherData({ lat, lon }: location) {
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
  const url = "https://api.open-meteo.com/v1/forecast";

  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];
  if (!response) {
    throw new Error("No response from api");
  } else {
    return response;
  }
}
