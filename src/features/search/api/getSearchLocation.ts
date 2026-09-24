import type { GeocodingResults } from "../components/locationsList.tsx";

export async function getSearchLocation(
  query: string,
): Promise<GeocodingResults> {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`;
  const geocodingSearchPromise = await fetch(url);
  const geocodingSearch = await geocodingSearchPromise.json();
  return geocodingSearch;
}
