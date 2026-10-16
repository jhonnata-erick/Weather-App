import { getWWOcode } from "../services/getData/getWWOcode.ts";
import type {
  HourlyForecast,
  OpenMeteoCurrently,
  OpenMeteoDaily,
  OpenMeteoHourly,
  TodayForecast,
  TodayForecastHour,
} from "../types/app-types.ts";
import { getDayOfWeek } from "../utils/dayofweek.ts";

export async function today_adapter(
  current: OpenMeteoCurrently,
  hourly: OpenMeteoHourly,
  daily: OpenMeteoDaily,
): Promise<TodayForecast> {
  /* ===== Current Conditions ===== */
  console.log(current.weather_code);
  const currentConditions = {
    date: new Date(current.time).toDateString(),
    temperature: +current.temperature_2m.toFixed(0),
    weather_code: current.weather_code,
    isDay: current.is_day,
    weather_status: await getWWOcode(current.weather_code),
    feelslike: +current.apparent_temperature.toFixed(0),
  };

  /* ========= Hourly Forecast ==========*/

  const sunset = new Date(daily.sunset[1]!);
  const sunrise = new Date(daily.sunrise[1]!);

  const now = new Date(current.time);

  const hours = [
    ...hourly.time.map((h) => new Date(h)).filter((h) => h !== now),
    sunrise,
    sunset,
    now,
  ];
  const temperatures = [
    ...hourly.temperature_2m.map((t) => +t.toFixed(0)),
    "Sunrise",
    "Sunset",
    +current.temperature_2m.toFixed(0),
  ];
  const weather_code = [...hourly.weather_code, 200, 300, current.weather_code];
  const past = hours.map((h) => h < now);
  const isDay = hours.map((h) => h > sunrise && h < sunset);
  const precipitation_chance = [
    ...hourly.precipitation_probability,
    0,
    0,
    current.precipitation,
  ];

  const unHours = hours.map((h, i) => {
    return {
      hour: h,
      temperature: temperatures[i]!,
      weather_code: weather_code[i]!,
      past: past[i]!,
      isDay: isDay[i]!,
      precipitation_chance: precipitation_chance[i]!,
    };
  });
  const hoursForecast: TodayForecastHour[] = unHours

    .sort((a, b) => +a.hour - +b.hour)
    .filter((a, i) => a.hour.getHours() !== unHours[i + 1]?.hour.getHours())
    .map((fh) => {
      return {
        ...fh,
        hour: fh.hour === now ? "Now" : fh.hour.toTimeString().slice(0, 5),
        temperature:
          typeof fh.temperature === "number"
            ? fh.temperature + "°"
            : fh.temperature,
      };
    });

  /* ========= Daily Forecast ========== */

  const daysForecast = await Promise.all(
    daily.time.map(async (d, i) => {
      const dayForecast = {
        dayOfWeek: getDayOfWeek(d)!,
        day: new Date(d).getDate(),
        max_temperature: daily.temperature_2m_max[i]!.toFixed(0) + "°",
        min_temperature: +daily.temperature_2m_min[i]!.toFixed(0) + "°",
        precipitation_chance: daily.precipitation_probability_max[i]! + "%",
        description: await getWWOcode(daily.weather_code[i]!),
        weather_code: daily.weather_code[i]!,
      };
      return dayForecast;
    }),
  );
  const todayForecast = {
    current: currentConditions,
    hourly: hoursForecast,
    daily: daysForecast,
  };
  return todayForecast;
}
