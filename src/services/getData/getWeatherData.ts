import { openmeteoParamsToURL } from "../../utils/openmeteoParamsToURL.ts";
import { HttpError } from "../../error/HttpRequest.ts";
import { endpoint, params } from "../../config/openmeteo.ts";
import type { location, OpenMeteoResponse } from "../../types/app-types.ts";
export async function getWeatherData(
  location: location,
): Promise<OpenMeteoResponse> {
  const url = openmeteoParamsToURL(endpoint, location, params);
  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json();
    throw new HttpError(
      error.message,
      response.status,
      import.meta.url,
      response.url,
    );
  }
  const apiResponse: OpenMeteoResponse = await response.json();
  return apiResponse;
}
