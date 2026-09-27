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
import { today_adapter } from "../adapter/today.adapter.ts";
import { main_adapter } from "../adapter/main.adapter.ts";

type WeatherStatus = "idle" | "loading" | "success" | "error";

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
      const weatherApiResponse = getWeatherData(location);
      const [todayForecast, hourlyForecast, dailyForecast] =
        await main_adapter();
      set({
        status: "success",
        todayForecast: null,
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
