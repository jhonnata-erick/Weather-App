interface location {
  lat: number;
  lon: number;
}
export function validateLocation(location: location) {
  const { lat, lon } = location;
  if (
    typeof lat !== "number" ||
    typeof lon !== "number" ||
    Number.isNaN(lat) ||
    Number.isNaN(lon)
  ) {
    return false;
  }
  const isLatValid = lat >= -90 && lat <= 90;
  const isLonValid = lon >= -180 && lon <= 180;
  return isLatValid && isLonValid;
}
