import type { HourlyForecast, OpenMeteoHourly } from "../types/app-types.ts";

export async function hourly_adapter(
  hourly: OpenMeteoHourly,
): Promise<HourlyForecast> {}
