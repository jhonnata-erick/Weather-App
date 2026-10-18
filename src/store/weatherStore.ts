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
import { today_adapter } from "../adapter/today.adapter.ts";
import { CacheData } from "../services/cache/cacheResponse.ts";
import { openmeteoStaleTime } from "../config/openmeteo.ts";
import { currentLocAdapter } from "../adapter/currentLoc.adapter.ts";
import { HttpError } from "../error/HttpRequest.ts";

type WeatherStatus = "idle" | "loading" | "success" | "error" | "offline";

const getWeather = CacheData(getWeatherData, openmeteoStaleTime());

interface AppStateStore {
  locationsHistory: locationInfo[];
  currentLoc: null | locationInfo;
  status: WeatherStatus;
  initConnectionListener: () => () => void;
  error: null | {
    name: string;
    url: string;
    status: number;
    reason: string;
    instance: string;
  };
  setError: (err: unknown) => void;
  todayForecast: null | TodayForecast;
  hourlyForecast: null | HourlyForecast;
  dailyForecast: null | DailyForecast;
  setWeatherData: (location: location) => Promise<void>;
}

const useWeatherStore = create<AppStateStore>((set) => ({
  locationsHistory: [],
  currentLoc: null,
  status: navigator.onLine ? "idle" : "offline",
  initConnectionListener: () => {
    console.log("listener iniciado");
    const handleOnline = () => {
      console.log("online");
      set({ status: "idle" });
    };
    const handleOffline = () => {
      console.log("offline");
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
  error: null,
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
  todayForecast: null,
  hourlyForecast: null,
  dailyForecast: null,
  setWeatherData: async (location: location) => {
    try {
      set({ status: "loading", error: null });
      const loc = await getGeocodingData(location);
      const weatherApiResponse = await getWeather(location);
      const [todayForecast, currentLoc] = await Promise.all([
        today_adapter(
          weatherApiResponse.current,
          weatherApiResponse.hourly,
          weatherApiResponse.daily,
        ),
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
    } catch (err) {
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
      set({
        status: "error",
        error: error,
      });
    }
  },
}));

export default useWeatherStore;
