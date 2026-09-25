import type { WeatherApiResponse } from "@openmeteo/sdk/weather-api-response.js";
import type { WeatherForecastData } from "../types/app-types.ts";

export function weatherRawDataAdapter(weatherRawData: WeatherApiResponse) {
  const latitude = weatherRawData.latitude();
  const longitude = weatherRawData.longitude();
  const elevation = weatherRawData.elevation();
  const timezone = weatherRawData.timezone();
  const timezoneAbbreviation = weatherRawData.timezoneAbbreviation();
  const utcOffsetSeconds = weatherRawData.utcOffsetSeconds();
  const generationTimeMilliseconds =
    weatherRawData.generationTimeMilliseconds();

  const current = weatherRawData.current()!;
  const hourly = weatherRawData.hourly()!;
  const daily = weatherRawData.daily()!;

  // Define Int64 variables so they can be processed accordingly
  const sunrise = daily.variables(2)!;
  const sunset = daily.variables(3)!;

  const time = new Date((Number(current.time()) + utcOffsetSeconds) * 1000);
  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData: WeatherForecastData = {
    latitude: latitude,
    longitude: longitude,
    generationtime_ms: generationTimeMilliseconds,
    utc_offset_seconds: utcOffsetSeconds,
    timezone: timezone,
    timezone_abbreviation: timezoneAbbreviation,
    elevation: elevation,
    current: {
      time: time.toISOString(),
      temperature_2m: current.variables(0)!.value(),
      relative_humidity_2m: current.variables(1)!.value(),
      apparent_temperature: current.variables(2)!.value(),
      is_day: current.variables(3)!.value(),
      precipitation: current.variables(4)!.value(),
      rain: current.variables(5)!.value(),
      weather_code: current.variables(6)!.value(),
      cloud_cover: current.variables(7)!.value(),
      snowfall: current.variables(8)!.value(),
    },
    hourly: {
      time: Array.from(
        {
          length:
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
            hourly.interval(),
        },
        (_, i) =>
          new Date(
            (Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) *
              1000,
          ).toISOString(),
      ),
      temperature_2m: hourly.variables(0)!.valuesArray(),
      relative_humidity_2m: hourly.variables(1)!.valuesArray(),
      apparent_temperature: hourly.variables(2)!.valuesArray(),
      precipitation_probability: hourly.variables(3)!.valuesArray(),
      precipitation: hourly.variables(4)!.valuesArray(),
      rain: hourly.variables(5)!.valuesArray(),
      snowfall: hourly.variables(6)!.valuesArray(),
      snow_depth: hourly.variables(7)!.valuesArray(),
      cloud_cover: hourly.variables(8)!.valuesArray(),
      visibility: hourly.variables(9)!.valuesArray(),
      temperature_80m: hourly.variables(10)!.valuesArray(),
      temperature_120m: hourly.variables(11)!.valuesArray(),
      temperature_180m: hourly.variables(12)!.valuesArray(),
      uv_index: hourly.variables(13)!.valuesArray(),
      is_day: hourly.variables(14)!.valuesArray(),
      weather_code: hourly.variables(15)!.valuesArray(),
    },
    daily: {
      time: Array.from(
        {
          length:
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval(),
        },
        (_, i) =>
          new Date(
            (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
              1000,
          ).toISOString(),
      ),
      temperature_2m_max: daily.variables(0)!.valuesArray(),
      temperature_2m_min: daily.variables(1)!.valuesArray(),
      // Map Int64 values to according structure
      sunrise: [...Array(sunrise.valuesInt64Length())].map((_, i) =>
        new Date(
          (Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000,
        ).toISOString(),
      ),
      // Map Int64 values to according structure
      sunset: [...Array(sunset.valuesInt64Length())].map((_, i) =>
        new Date(
          (Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000,
        ).toISOString(),
      ),
      moon_phase: daily.variables(4)!.valuesArray(),
      precipitation_probability_max: daily.variables(5)!.valuesArray(),
      weather_code: daily.variables(6)!.valuesArray(),
    },
  };
  return weatherData;
}
