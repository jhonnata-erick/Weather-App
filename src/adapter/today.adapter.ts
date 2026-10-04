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
  const sunset = new Date(daily.sunset[1]!);
  const sunrise = new Date(daily.sunrise[1]!);

  /*const hoursArray = () => {
    for (let index = 0; index < hourly.time.length + 1; ) {
      const newHourly: string[] = [];
      const hour = new Date(hourly.time![index]!).getHours();
      const ss = sunset.getHours() + sunset.getMinutes() / 60;
      const sr = sunrise.getHours() + sunset.getMinutes() / 60;

      if (sr >= hour && sr <= hour + 1) {
        newHourly.push(hour + ":00");
        newHourly.push(sunrise.toTimeString().slice(0, 5));
        index += 2;
      } else if (ss >= hour && ss <= hour + 1) {
        newHourly.push(hour + ":00");
        newHourly.push(sunset.toTimeString().slice(0, 5));
        index += 2;
      } else if (hour === now) {
        newHourly.push("Now");
        index++;
      } else {
        newHourly.push(hour + ":00");
        index++;
      }
      if (index === hourly.time.length + 1) {
        return newHourly;
      }
    }
  };*/

  const currentConditions = {
    date: new Date(current.time).toDateString(),
    temperature: +current.temperature_2m.toFixed(0),
    weather_status: await getWWOcode(current.weather_code),
    feelslike: +current.apparent_temperature.toFixed(0),
  };
  const hourlyTime = hourly.time.map((h) => new Date(h).getHours());
  const ss = sunset.getHours() + sunset.getMinutes() / 60;
  const sr = sunrise.getHours() + sunrise.getMinutes() / 60;
  const sri = hourlyTime.findIndex((h) => h > sr);
  const ssi = hourlyTime.findIndex((h) => h > ss && ss < h - 1);
  const sss = new Date(0, 0, 1, sunset.getHours(), sunset.getMinutes())
    .toTimeString()
    .slice(0, 5);
  const srs = new Date(0, 0, 1, sunrise.getHours(), sunrise.getMinutes())
    .toTimeString()
    .slice(0, 5);

  const now = new Date(current.time);
  const hoursForecast = hourly.time.map((h, i) => {
    const hour = new Date(h);
    const hourForecast = {
      hour:
        hour.getHours() === now.getHours() ? "Now" : hour.getHours() + ":00",
      temperature: hourly.temperature_2m[i]!.toFixed(0) + "º",
      weather_code: hourly.weather_code[i]!,
      past: hour < now,
      isDay: hour > sunrise && hour < sunset,
    };
    return hourForecast;
  });
  hoursForecast.splice(sri, 0, {
    hour: srs,
    temperature: "",
    weather_code: 200,
    past: sunrise < now,
    isDay: true,
  });
  hoursForecast.splice(ssi, 0, {
    hour: sss,
    temperature: "",
    weather_code: 300,
    past: sunset < now,
    isDay: true,
  });
  const daysForecast = daily.time.map((d, i) => {
    const dayForecast = {
      dayOfWeek: getDayOfWeek(d)!,
      day: new Date(d).getDate(),
      max_temperature: +daily.temperature_2m_max[i]!.toFixed(0),
      min_temperature: +daily.temperature_2m_min[i]!.toFixed(0),
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
