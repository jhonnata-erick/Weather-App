import { getWWOcode } from "../services/getData/getWWOcode.ts";
import type {
  OpenMeteoCurrently,
  OpenMeteoDaily,
  OpenMeteoHourly,
  TodayForecast,
} from "../types/app-types.ts";
import { getDayOfWeek } from "../utils/dayofweek.ts";

export async function today_adapter(
  current: OpenMeteoCurrently,
  hourly: OpenMeteoHourly,
  daily: OpenMeteoDaily,
): Promise<TodayForecast> {
  const currentConditions = {
    date: new Date(current.time).toDateString(),
    temperature: current.temperature_2m,
    weather_status: await getWWOcode(current.weather_code),
    feelslike: current.apparent_temperature,
  };
  const hoursForecast = hourly.time.map((h, i) => {
    const now = new Date().getHours();
    const hour = new Date(h).getHours();
    const hourForecast = {
      hour: hour === now ? "Now" : hour,
      temperature: hourly.temperature_2m[i]!,
    };
    return hourForecast;
  });
  const daysForecast = daily.time.map((d, i) => {
    const dayForecast = {
      dayOfWeek: getDayOfWeek(d)!,
      day: new Date(d).getDate(),
      max_temperature: daily.temperature_2m_max[i]!,
      min_temperature: daily.temperature_2m_min[i]!,
      precipitation_chance: daily.precipitation_probability_max[i]!,
    };
    return dayForecast;
  });
  const todayForecast = {
    current: currentConditions,
    hourly: hoursForecast,
    daily: daysForecast,
  };
  return todayForecast;
}
