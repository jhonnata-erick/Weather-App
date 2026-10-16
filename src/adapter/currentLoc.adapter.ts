import type {
  Address,
  locationInfo,
  OpenMeteoResponse,
} from "../types/app-types.ts";

export async function currentLocAdapter(
  loc: Address,
  weatherApiResponse: OpenMeteoResponse,
): Promise<locationInfo> {
  return {
    id: `${weatherApiResponse.latitude}${weatherApiResponse.longitude}`,
    name: loc.city,
    city: loc.city,
    state: loc.state,
    country: loc.country,
    time: `${new Date(weatherApiResponse.current.time).toDateString()}, ${new Date(weatherApiResponse.current.time).toTimeString().slice(0, 5)}`,
    location: {
      lat: weatherApiResponse.latitude,
      lon: weatherApiResponse.longitude,
    },
    timesQueried: new Date().getTime(),
  };
}
