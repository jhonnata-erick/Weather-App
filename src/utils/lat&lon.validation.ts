import type { location } from "../types/app-types.ts";

export function validateLocation({ lat, lon }: location) {
  if (
    typeof lat !== "number" ||
    typeof lon !== "number" ||
    Number.isNaN(lat) ||
    Number.isNaN(lon) ||
    lat === undefined ||
    lon === undefined
  ) {
    return false;
  }
  const isLatValid = lat >= -90 && lat <= 90;
  const isLonValid = lon >= -180 && lon <= 180;
  return isLatValid && isLonValid;
}
