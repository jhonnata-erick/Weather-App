import { create } from "zustand";
import { getGeocodingData } from "../services/getData/getLocationName.ts";
import type {
  location,
  TodayForecast,
  HourlyForecast,
  DailyForecast,
  locationInfo,
} from "../types/app-types.ts";
import { getWeatherData } from "../services/getData/getWeatherData.ts";
import { getWWOcode } from "../services/getData/getWWOcode.ts";
import { main_adapter } from "../adapter/main.adapter.ts";
import { today_adapter } from "../adapter/today.adapter.ts";
import { hourly_adapter } from "../adapter/hourly.adapter.ts";
import { daily_adapter } from "../adapter/daily.adapter.ts";
import { CacheData } from "../services/cache/cacheResponse.ts";
import React from "react";
import { openmeteoStaleTime } from "../config/openmeteo.ts";
import { currentLocAdapter } from "../adapter/currentLoc.adapter.ts";
import { getSearchLocation } from "../services/getData/getSearchLocation.ts";
import { HttpError } from "../error/HttpRequest.ts";

type WeatherStatus = "idle" | "loading" | "success" | "error";

const getWeather = CacheData(getWeatherData, openmeteoStaleTime());
const todayAdapter = CacheData(today_adapter, openmeteoStaleTime());

interface AppStateStore {
  locationsHistory: locationInfo[];
  currentLoc: null | locationInfo;
  status: WeatherStatus;
  error: unknown;
  todayForecast: null | TodayForecast;
  hourlyForecast: null | HourlyForecast;
  dailyForecast: null | DailyForecast;
  setWeatherData: (location: location) => Promise<void>;
}

const useWeatherStore = create<AppStateStore>((set) => ({
  locationsHistory: [],
  currentLoc: null,
  status: "idle",
  error: "",
  todayForecast: null,
  hourlyForecast: null,
  dailyForecast: null,
  setWeatherData: async (location: location) => {
    try {
      set({ status: "loading", error: "" });
      const loc = await getGeocodingData(location);
      const weatherApiResponse = await getWeather(location);
      const [todayForecast, hourlyForecast, dailyForecast, currentLoc] =
        await Promise.all([
          todayAdapter(
            weatherApiResponse.current,
            weatherApiResponse.hourly,
            weatherApiResponse.daily,
          ),
          hourly_adapter(weatherApiResponse.hourly),
          daily_adapter(weatherApiResponse.daily),
          currentLocAdapter(loc, weatherApiResponse),
        ]);
      const cachedHistory = localStorage.getItem("searchHistory");
      if (!cachedHistory) {
        const locationsHistory = [currentLoc];
        localStorage.setItem("searchHistory", JSON.stringify(locationsHistory));
        set({ locationsHistory: locationsHistory });
      } else {
        const historyArr: locationInfo[] = JSON.parse(cachedHistory);
        if (historyArr.some((i) => i.id === currentLoc.id)) {
          const locationsHistory = historyArr.filter(
            (item) => item.id !== currentLoc.id,
          );
          locationsHistory.push(currentLoc);
          localStorage.setItem(
            "searchHistory",
            JSON.stringify(locationsHistory),
          );
          set({
            locationsHistory: locationsHistory.sort(
              (a, b) => b.timesQueried - a.timesQueried,
            ),
          });
        } else {
          historyArr.push(currentLoc);
          localStorage.setItem("searchHistory", JSON.stringify(historyArr));
          set({
            locationsHistory: historyArr.sort(
              (a, b) => b.timesQueried - a.timesQueried,
            ),
          });
        }
      }
      set({
        status: "success",
        todayForecast: todayForecast,
        hourlyForecast: null,
        dailyForecast: null,
        currentLoc: currentLoc,
      });
    } catch (error) {
      set({
        status: "error",
        error: error instanceof HttpError ? error.message : String(error),
      });
    }
  },
}));

export default useWeatherStore;
