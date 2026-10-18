import { openmeteoParamsToURL } from "../../config/openmeteo.ts";
import { HttpError } from "../../error/HttpRequest.ts";
import type {
  location,
  OpenMeteoParams,
  OpenMeteoResponse,
} from "../../types/app-types.ts";
export async function getWeatherData(
  location: location,
): Promise<OpenMeteoResponse> {
  const url = openmeteoParamsToURL(location);
  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json();
    throw new HttpError(
      response.status,
      error.message,
      import.meta.url,
      response.url,
    );
  }
  const apiResponse: OpenMeteoResponse = await response.json();
  return apiResponse;
}

//"?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,moon_phase,precipitation_probability_max,weather_code,uv_index_max,sunrise,sunset,uv_index_clear_sky_max&hourly=precipitation_probability,snow_depth,cloud_cover,visibility,uv_index,weather_code,surface_pressure,showers,temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,rain,snowfall,wind_speed_10m,wind_gusts_10m,wind_direction_10m&models=best_match&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,surface_pressure,cloud_cover,wind_speed_10m,wind_gusts_10m,wind_direction_10m,is_day&timezone=auto&past_days=1&forecast_days=14&forecast_hours=12&past_hours=6&forecast_minutely_15=48&past_minutely_15=24"
