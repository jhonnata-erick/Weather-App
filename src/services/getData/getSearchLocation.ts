import { HttpError } from "../../error/HttpRequest.ts";
import type { GeocodingResults } from "../../types/app-types.ts";

export async function getSearchLocation(
  query: string,
): Promise<GeocodingResults> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`;
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
  const geocodingSearch: GeocodingResults = await response.json();
  return geocodingSearch;
}
