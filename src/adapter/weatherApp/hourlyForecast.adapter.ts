import type { HourlyWeather, RawHourlyWeather } from "../../types/api-types.ts";

export async function hourlyAdapter(
  hourlyData: RawHourlyWeather,
): Promise<HourlyWeather> {
  const hourlyWeatherRaw = hourlyData.time.map((hour, i) => {
    const precipitation_probability = hourlyData.precipitation_probability![i];
    const precipitation = hourlyData.precipitation![i];
    const rain = hourlyData.rain![i];
    const snowfall = hourlyData.snowfall![i];
    const snow_depth = hourlyData.snow_depth![i];
    const cloud_cover = hourlyData.cloud_cover![i];
    const is_day = hourlyData.is_day![i];
    const weather_code = hourlyData.weather_code![i];

    const weather_type: () =>
      | "Rain"
      | "Drizzle"
      | "Stormy"
      | "Snow"
      | "Clear"
      | "Partially Cloudy"
      | "Cloudy" = () => {
      if (rain! > 0 && rain! < 0.26) return rain! > 0.01 ? "Rain" : "Drizzle";
      else if (rain! > 0.25) return "Stormy";
      else if (snowfall! > 0) return "Snow";
      else if (cloud_cover! > 0 && cloud_cover! < 21) return "Clear";
      else if (cloud_cover! > 20 && cloud_cover! < 71)
        return "Partially Cloudy";
      else return "Cloudy";
    };
    const thisHour = new Date(hour);
    const currentHour = new Date().getHours();
    if (thisHour.getHours() === currentHour) {
      return {
        hour: "Now",
        temp: hourlyData.temperature_2m![i]!.toFixed(0).toString() + "°",
        weather_type: weather_type(),
        weather_code: weather_code!,
        precipitation_chance: precipitation_probability! + "%",
        isDay: hourlyData.is_day![i]! === 1,
      };
    } else {
      return {
        hour: thisHour.getHours() + ":00",
        temp: hourlyData.temperature_2m![i]!.toFixed(0).toString() + "°",
        weather_type: weather_type(),
        weather_code: weather_code!,
        precipitation_chance: precipitation_probability! + "%",
        isDay: hourlyData.is_day![i]! === 1,
      };
    }
  });
  const hourlyWeather = hourlyWeatherRaw.slice(
    hourlyWeatherRaw.findIndex((item) => item.hour === "Now"),
    hourlyWeatherRaw.length - 1,
  );
  return hourlyWeather;
}
