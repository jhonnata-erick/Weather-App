import { create } from "zustand";
import { getGeocodingData } from "../services/geocoding-api/getLocationName.ts";
import type { location, WeatherApp } from "../types/app-types.ts";
import { getWeatherData } from "../services/weather-api/getWeatherData.ts";
import { weatherAppAdapter } from "../adapter/weatherApp/weatherApp.adapter.ts";

type WeatherStatus = "idle" | "loading" | "success" | "error";

interface AppStateStore {
  location: { lat: number; lon: number };
  status: WeatherStatus;
  error: unknown;
  WeatherAppData: null | WeatherApp;
  getWeatherAppData: (location: location) => Promise<void>;
}

const useWeatherStore = create<AppStateStore>((set) => ({
  location: { lat: NaN, lon: NaN },
  status: "idle",
  error: "",
  WeatherAppData: null,
  getWeatherAppData: async (location: location) => {
    try {
      set({ status: "loading", location: location });
      const [weatherRawData, geocodingRawData] = await Promise.all([
        getWeatherData(location),
        getGeocodingData(location),
      ]);
      const weatherData = await weatherAppAdapter(
        weatherRawData,
        geocodingRawData,
      );
      set({
        status: "success",
        WeatherAppData: weatherData,
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
