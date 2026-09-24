import { getWWOcode } from "../../services/getWWOcode.ts";
import type { DailyWeather, RawDailyWeather } from "../../types/api-types.ts";

export async function dailyAdapter(
  dailyData: RawDailyWeather,
): Promise<DailyWeather> {
  const dailyPromise = dailyData.time.map(async (day, i) => {
    console.log(day);
    const weatherCodeOBJ = await getWWOcode(dailyData.weather_code![i]!);
    const weather_type: string = weatherCodeOBJ
      ? weatherCodeOBJ.day.description
      : "Unknown";
    const day_of_week: () =>
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday"
      | "Sunday"
      | "Today" = () => {
      const date = new Date(day).getUTCDay();
      const today = new Date().getDay();
      if (date === today) return "Today";
      const days: Array<
        | "Sunday"
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday"
      > = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const target = days[date]!;
      return target;
    };
    return {
      day_of_week: day_of_week(),
      max_temp: dailyData.temperature_2m_max![i]!.toFixed(0) + "°",
      min_temp: dailyData.temperature_2m_min![i]!.toFixed(0) + "°",
      weather_type: weather_type,
      weather_code: dailyData.weather_code![i]!,
      precipitation_chance: dailyData.precipitation_probability_max![i]! + "%",
    };
  });
  const dailyWeather = await Promise.all(dailyPromise);
  return dailyWeather;
}
