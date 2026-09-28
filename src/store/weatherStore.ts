import { create } from "zustand";
import { getGeocodingData } from "../services/getData/getLocationName.ts";
import type {
  location,
  TodayForecast,
  HourlyForecast,
  DailyForecast,
} from "../types/app-types.ts";
import { getWeatherData } from "../services/getData/getWeatherData.ts";
import { getWWOcode } from "../services/getData/getWWOcode.ts";
import { main_adapter } from "../adapter/main.adapter.ts";
import { today_adapter } from "../adapter/today.adapter.ts";
import { hourly_adapter } from "../adapter/hourly.adapter.ts";
import { daily_adapter } from "../adapter/daily.adapter.ts";
import { CacheData } from "../services/cache/cacheResponse.ts";
import React from "react";

type WeatherStatus = "idle" | "loading" | "success" | "error";

function boga(a: number, b: string) {
  return a + b;
}

const getWeather = CacheData(getWeatherData, 600);

interface AppStateStore {
  location: { lat: number; lon: number };
  status: WeatherStatus;
  error: unknown;
  todayForecast: null | TodayForecast;
  hourlyForecast: null | HourlyForecast;
  dailyForecast: null | DailyForecast;
  setWeatherData: (location: location) => Promise<void>;
}

const useWeatherStore = create<AppStateStore>((set) => ({
  location: { lat: NaN, lon: NaN },
  status: "idle",
  error: "",
  todayForecast: null,
  hourlyForecast: null,
  dailyForecast: null,
  setWeatherData: async (location: location) => {
    try {
      set({ status: "loading", location: location, error: "" });
      const weatherApiResponse = await getWeather(location);
      const [todayForecast, hourlyForecast, dailyForecast] = await Promise.all([
        today_adapter(
          weatherApiResponse.current,
          weatherApiResponse.hourly,
          weatherApiResponse.daily,
        ),
        hourly_adapter(weatherApiResponse.hourly),
        daily_adapter(weatherApiResponse.daily),
      ]);
      set({
        status: "success",
        todayForecast: todayForecast,
        hourlyForecast: null,
        dailyForecast: null,
      });
    } catch (error) {
      set({
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  },
}));

export default useWeatherStore;
