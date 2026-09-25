import type {
  Address,
  WeatherApp,
  WeatherForecastData,
} from "../../types/app-types.ts";
import type { WeatherApiResponse } from "@openmeteo/sdk/weather-api-response.js";
import { weatherRawDataAdapter } from "../weatherApiResponse.ts";
import { currentAdapter } from "./currentWeather.adapter.ts";
import { dailyAdapter } from "./dailyForecast.adapter.ts";
import { hourlyAdapter } from "./hourlyForecast.adapter.ts";
import { todayWeatherAdapter } from "./todayWeather.adapter.ts";

export async function weatherAppAdapter(
  weatherRawData: WeatherApiResponse,
  Address: Address,
) {
  const weatherData: WeatherForecastData =
    weatherRawDataAdapter(weatherRawData);
  const [current, daily, hourly] = await Promise.all([
    currentAdapter(weatherData.current),
    dailyAdapter(weatherData.daily),
    hourlyAdapter(weatherData.hourly),
  ]);
  const todayWeather = todayWeatherAdapter(weatherData);
  const weatherApp: WeatherApp = {
    city: Address.city,
    currentConditions: current,
    hourlyForecast: hourly,
    dailyForecast: daily,
    todayWeather: todayWeather,
  };
  return weatherApp;
}
