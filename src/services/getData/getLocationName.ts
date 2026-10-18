import { HttpError } from "../../error/HttpRequest.ts";
import type { Address } from "../../types/app-types.ts";

interface location {
  lat: number;
  lon: number;
}
export async function getGeocodingData(location: location) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.lat}&lon=${location.lon}&layer=address`;
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
  const reverseGeolocationRaw = await response.json();
  const GeolocationData: Address = reverseGeolocationRaw.address;
  return GeolocationData;
}
