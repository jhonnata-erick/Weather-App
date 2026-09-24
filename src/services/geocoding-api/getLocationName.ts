import type { Address } from "../../types/api-types.ts";

interface location {
  lat: number;
  lon: number;
}
export async function getGeocodingData(location: location) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${location.lat}&lon=${location.lon}&layer=address`;
  const response = await fetch(url);
  const reverseGeolocationRaw = await response.json();
  const GeolocationData: Address = reverseGeolocationRaw.address;
  return GeolocationData;
}
