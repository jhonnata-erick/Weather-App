import type {
  CurrentUnits,
  Address,
  RawCurrentWeather,
  CurrentWeather,
} from "../../types/api-types.ts";
import { getWWOcode } from "../../services/getWWOcode.ts";

export async function currentAdapter(
  apiCurrent: RawCurrentWeather,
): Promise<CurrentWeather> {
  const local = "en-US";
  const day = new Date(apiCurrent.time);
  const temperature = `${apiCurrent.temperature_2m.toFixed(0)}°`;
  const date = day.toLocaleDateString(local, {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const wwoCodeObject = await getWWOcode(apiCurrent.weather_code);

  const desc: string = apiCurrent.is_day
    ? wwoCodeObject.day.description
    : wwoCodeObject.night.description;

  const time = new Date(apiCurrent.time);
  const hour =
    time.getUTCHours().toString() + ":" + time.getUTCMinutes().toString();

  const currentWeatherUIData = {
    temperature: temperature,
    description: desc,
    current_date: date,
    current_hour: hour,
  };
  return currentWeatherUIData;
}
