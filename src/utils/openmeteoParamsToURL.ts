import type { location, OpenMeteoParams } from "../types/app-types";

export function openmeteoParamsToURL(
  endpoint: string,
  { lat, lon }: location,
  params: OpenMeteoParams,
) {
  const { daily, hourly, current, minutely_15, models } = params;
  const paramsArray = Object.entries({
    ...params,
    latitude: lat,
    longitude: lon,
    daily: daily?.toString(),
    hourly: hourly?.toString(),
    models: models?.toString(),
    current: current?.toString(),
    minutely_15: minutely_15?.toString(),
  });
  const paramsURL = paramsArray
    .filter((pars) => pars[1]! !== undefined)
    .map((value) => value.join("="))
    .join("&");
  return endpoint + "?" + paramsURL;
}
