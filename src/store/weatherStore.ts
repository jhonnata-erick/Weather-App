import { create } from "zustand";
import { getGeocodingData } from "../services/getData/getLocationName.ts";
import type {
  location,
  TodayForecast,
  locationInfo,
} from "../types/app-types.ts";
import { getWeatherData } from "../services/getData/getWeatherData.ts";
import { today_adapter } from "../adapter/today.adapter.ts";
import { CacheData } from "../services/cache/cacheResponse.ts";
import { openmeteoStaleTime } from "../config/openmeteo.ts";
import { currentLocAdapter } from "../adapter/currentLoc.adapter.ts";
import { HttpError } from "../error/HttpRequest.ts";

type WeatherStatus = "idle" | "loading" | "success" | "error" | "offline";

interface AppStateStore {
  locationsHistory: locationInfo[];
  currentLoc: null | locationInfo;
  status: WeatherStatus;
  todayForecast: null | TodayForecast;
  error: null | {
    name: string;
    url: string;
    status: number;
    reason: string;
    instance: string;
  };
  initConnectionListener: () => () => void;
  setWeatherData: (location: location) => Promise<void>;
  setHistoryData: (currentLoc: locationInfo) => void;
  setError: (err: unknown) => void;
}

const useWeatherStore = create<AppStateStore>((set, get) => ({
  locationsHistory: [],
  currentLoc: null,
  status: navigator.onLine ? "idle" : "offline",
  todayForecast: null,
  error: null,
  initConnectionListener: () => {
    const handleOnline = () => {
      set({ status: "idle" });
    };
    const handleOffline = () => {
      set({
        error: {
          name: "",
          url: "",
          status: 0,
          reason: "No Network Connection",
          instance: "",
        },
        status: "offline",
      });
    };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  },
  setWeatherData: async (location: location) => {
    const getWeather = CacheData(getWeatherData, openmeteoStaleTime());
    set({ status: "loading", error: null });
    try {
      const loc = await getGeocodingData(location);
      const weatherApiResponse = await getWeather(location);
      const [todayForecast, currentLoc] = await Promise.all([
        today_adapter(weatherApiResponse),
        currentLocAdapter(loc, weatherApiResponse),
      ]);
      get().setHistoryData(currentLoc);
      set({
        status: "success",
        todayForecast: todayForecast,
      });
    } catch (err) {
      get().setError(err);
    }
  },
  setHistoryData: (currentLoc) => {
    let rawData;
    try {
      rawData = localStorage.getItem("searchHistory");
      if (rawData) {
        const rawHistory: locationInfo[] = JSON.parse(rawData);
        if (rawHistory.some((i) => i.id === currentLoc.id)) {
          const history = rawHistory.filter(
            (item) => item.id !== currentLoc.id,
          );
          const sortedHistory = [...history, currentLoc].sort(
            (a, b) => b.timesQueried - a.timesQueried,
          );
          localStorage.setItem("searchHistory", JSON.stringify(sortedHistory));
          set({
            locationsHistory: sortedHistory,
            currentLoc: currentLoc,
          });
        } else {
          const sortedHistory = [...JSON.parse(rawData), currentLoc].sort(
            (a, b) => b.timesQueried - a.timesQueried,
          );
          localStorage.setItem("searchHistory", JSON.stringify(sortedHistory));
          set({ locationsHistory: sortedHistory, currentLoc: currentLoc });
        }
      } else {
        const history = [currentLoc];
        localStorage.setItem("searchHistory", JSON.stringify(history));
        set({ locationsHistory: history, currentLoc: currentLoc });
      }
    } catch (error) {
      console.log(error);
      const history = [currentLoc];
      localStorage.setItem("searchHistory", JSON.stringify(history));
      set({ locationsHistory: history, currentLoc: currentLoc });
    }
  },
  setError: (err) => {
    const error =
      err instanceof HttpError
        ? {
            name: err.name,
            url: err.url,
            status: err.status,
            reason: err.reason,
            instance: err.instance,
          }
        : {
            name: "",
            url: "",
            status: 0,
            reason: String(err),
            instance: "",
          };
    set({ error: error, status: navigator.onLine ? "error" : "offline" });
  },
}));

export default useWeatherStore;
