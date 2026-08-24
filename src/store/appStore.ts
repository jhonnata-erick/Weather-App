import { create } from "zustand";

type WeatherStatus = "idle" | "loading" | "success" | "error";

interface AppState {
  status: WeatherStatus;
}

const useWeatherStore = create((set) => ({}));
