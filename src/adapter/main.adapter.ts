import type {
  OpenMeteoResponse,
  OpenMeteoCurrently,
  OpenMeteoDaily,
  OpenMeteoHourly,
  TodayForecastCurrent,
  TodayForecast,
} from "../types/app-types.ts";
import { getWWOcode } from "../services/getData/getWWOcode.ts";
import { today_adapter } from "./today.adapter.ts";
import { hourly_adapter } from "./hourly.adapter.ts";
import { daily_adapter } from "./daily.adapter.ts";

export async function main_adapter(apiResponse: OpenMeteoResponse) {
  const todayForecast: Promise<TodayForecast> = today_adapter(
    apiResponse.current,
    apiResponse.hourly,
    apiResponse.daily,
  );
  const hourlyForecast = hourly_adapter(apiResponse.hourly);
  const dailyForecast = daily_adapter(apiResponse.daily);
  return [todayForecast, hourlyForecast, dailyForecast];
}

/*class HourForecast {
  hour;
  temperature;
  constructor(hour: string, temperature: number) {
    this.hour = new Date(hour).getDate();
    this.temperature = temperature;
  }
}
class DayForecast {
  dayOfWeek;
  day;
  max_temperature;
  min_temperature;
  precipitation_chance?;
  constructor(
    date: string,
    max_temperature: number,
    min_temperature: number,
    precipitation_chance?: number,
  ) {
    const getDayOfWeek = (date: string) => {
      const dayNumber = new Date(date).getUTCDay();
      const todayDayNumber = new Date().getUTCDay();
      const days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const day_of_week =
        todayDayNumber === dayNumber ? "Today" : days[dayNumber];
      return day_of_week;
    };
    const dayOfWeek = getDayOfWeek(date);
    if (dayOfWeek) {
      this.dayOfWeek = dayOfWeek;
    }
    this.day = new Date(date).getUTCDay();
    this.max_temperature = max_temperature;
    this.min_temperature = min_temperature;
    this.precipitation_chance = precipitation_chance;
  }
}

class TodayForecast {
  current;
  hourly;
  daily;
  constructor(
    current: OpenMeteoCurrently,
    hourly: OpenMeteoHourly,
    daily: OpenMeteoDaily,
  ) {
    this.current = new CurrentConditions(
      current.time,
      current.temperature_2m,
      current.weather_code,
      current.apparent_temperature,
    );
  }
}
*/
