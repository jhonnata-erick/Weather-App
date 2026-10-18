import { getWMOcode } from "../services/getData/getWMOcode.ts";
import type {
  OpenMeteoResponse,
  TodayForecast,
  TodayForecastHour,
} from "../types/app-types.ts";
import { getDayOfWeek } from "../utils/dayofweek.ts";
import { params } from "../config/openmeteo.ts";

export async function today_adapter(
  weatherData: OpenMeteoResponse,
): Promise<TodayForecast> {
  const { current, hourly, daily } = weatherData;
  const wmoCodeList = await getWMOcode();
  /* ===== Current Conditions ===== */
  const currentConditions = {
    date: new Date(current.time).toDateString(),
    temperature: +current.temperature_2m.toFixed(0),
    weather_code: current.weather_code,
    isDay: current.is_day,
    weather_status: wmoCodeList[current.weather_code] || "Invalide Code",
    feelslike: +current.apparent_temperature.toFixed(0),
  };

  /* ========= Hourly Forecast ==========*/
  const pastdays = params.past_days;
  const sunset = new Date(daily.sunset[pastdays]!);
  const sunrise = new Date(daily.sunrise[pastdays]!);

  const now = new Date(current.time);

  const hours = [...hourly.time.map((h) => new Date(h)), sunrise, sunset, now];
  const temperatures = [
    ...hourly.temperature_2m.map((t) => +t.toFixed(0)),
    "Sunrise",
    "Sunset",
    +current.temperature_2m.toFixed(0),
  ];
  const weather_code = [...hourly.weather_code, 200, 300, current.weather_code];
  const past = hours.map((h) => h < now);
  const isDay = hours.map((h) => h > sunrise && h < sunset);
  const precipitation_chance = [...hourly.precipitation_probability, 0, 0, 0];

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
    .filter((a, i) => a.hour !== unHours[i + 1]?.hour)
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
        dayOfWeek: getDayOfWeek(d, weatherData.timezone!, current.time)!,
        day: new Date(d).getDate(),
        max_temperature: daily.temperature_2m_max[i]!.toFixed(0) + "°",
        min_temperature: +daily.temperature_2m_min[i]!.toFixed(0) + "°",
        precipitation_chance: daily.precipitation_probability_max[i]! + "%",
        description: wmoCodeList[daily.weather_code[i]!] || "Invalide Code",
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
