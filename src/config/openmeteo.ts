import type { location, OpenMeteoParams } from "../types/app-types.ts";

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
export function openmeteoStaleTime(): number {
  const omMin = [0, 15, 30, 45, 60];
  let stale: number = NaN;
  omMin.forEach((m, i) => {
    const date = new Date();
    const currentMinute = date.getMinutes() + date.getSeconds() / 60;
    const difference = currentMinute * 60 - m * 60;
    if (Number.isNaN(stale) && difference < 0) {
      stale = difference * -1;
    }
  });

  return stale;
}
