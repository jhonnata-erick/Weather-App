export type IpInfo = {
  status: string;
  message?: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  lat: number;
  lon: number;
  timezone: string;
  proxy: boolean;
  query: string;
};
export type WeatherForecastData = {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string | null;
  timezone_abbreviation: string | null;
  elevation: number;
  current: RawCurrentWeather;
  hourly: RawHourlyWeather;
  daily: RawDailyWeather;
};

export interface CurrentUnits {
  time: "iso8601";
  interval: "seconds" | "minutes" | "hours";
  temperature_2m: "°C" | "°F";
  relative_humidity_2m: "%";
  apparent_temperature: "°C" | "°F";
  is_day: "";
  precipitation: "mm";
  rain: "mm";
  weather_code: "wmo code";
  cloud_cover: "%";
  snowfall: "cm";
}

export interface RawCurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  is_day: number;
  precipitation: number;
  rain: number;
  weather_code: number;
  cloud_cover: number;
  snowfall: number;
}
export interface HourlyUnits {
  time: "iso8601";
  temperature_2m: "°C" | "°F";
  relative_humidity_2m: "%";
  apparent_temperature: "°C" | "°F";
  precipitation_probability: "%";
  precipitation: "mm";
  rain: "mm";
  snowfall: "cm";
  snow_depth: "m";
  cloud_cover: "%";
  visibility: "m";
  temperature_80m: "°C" | "°F";
  temperature_120m: "°C" | "°F";
  temperature_180m: "°C" | "°F";
  uv_index: string;
  is_day: string;
}

export interface RawHourlyWeather {
  time: string[];
  temperature_2m: Float32Array<ArrayBufferLike> | null;
  relative_humidity_2m: Float32Array<ArrayBufferLike> | null;
  apparent_temperature: Float32Array<ArrayBufferLike> | null;
  precipitation_probability: Float32Array<ArrayBufferLike> | null;
  precipitation: Float32Array<ArrayBufferLike> | null;
  rain: Float32Array<ArrayBufferLike> | null;
  snowfall: Float32Array<ArrayBufferLike> | null;
  snow_depth: Float32Array<ArrayBufferLike> | null;
  cloud_cover: Float32Array<ArrayBufferLike> | null;
  visibility: Float32Array<ArrayBufferLike> | null;
  temperature_80m: Float32Array<ArrayBufferLike> | null;
  temperature_120m: Float32Array<ArrayBufferLike> | null;
  temperature_180m: Float32Array<ArrayBufferLike> | null;
  uv_index: Float32Array<ArrayBufferLike> | null;
  is_day: Float32Array<ArrayBufferLike> | null;
  weather_code: Float32Array<ArrayBufferLike> | null;
}

export interface DailyUnits {
  time: "iso8601";
  temperature_2m_max: "°C" | "°F";
  temperature_2m_min: "°C" | "°F";
  sunrise: "iso8601";
  sunset: "iso8601";
  moon_phase: "fraction";
  precipitation_probability_max: "%";
  weather_code: "wmo code";
}

export interface RawDailyWeather {
  time: string[];
  temperature_2m_max: Float32Array<ArrayBufferLike> | null;
  temperature_2m_min: Float32Array<ArrayBufferLike> | null;
  sunrise: string[];
  sunset: string[];
  moon_phase: Float32Array<ArrayBufferLike> | null;
  precipitation_probability_max: Float32Array<ArrayBufferLike> | null;
  weather_code: Float32Array<ArrayBufferLike> | null;
}

export interface CurrentWeather {
  temperature: string;
  description: string;
  current_date: string;
  current_hour: string;
}

export type HourlyWeather = HourForecast[];

export type DailyWeather = DayForecast[];

//

export interface HourForecast {
  hour: string;
  temp: string;
  weather_type:
    | "Rain"
    | "Drizzle"
    | "Stormy"
    | "Snow"
    | "Clear"
    | "Partially Cloudy"
    | "Cloudy";
  weather_code: number;
  precipitation_chance: string;
  isDay: boolean;
}
export interface WeatherToday {
  max_temp: string;
  min_temp: string;
  weather_type:
    | "Rain"
    | "Drizzle"
    | "Stormy"
    | "Snow"
    | "Clear"
    | "Partially Cloudy"
    | "Cloudy";
  rain?: string;
  humidity?: string;
  sunrise?: string;
  sunset?: string;
}

export interface DayForecast {
  day_of_week:
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Today";
  max_temp: string;
  min_temp: string;
  weather_type: string;
  weather_code: number;
  precipitation_chance: string;
}

export interface Address {
  house_number: string;
  road: string;
  suburb: string;
  city_district: string;
  city: string;
  state: string;
  "ISO3166-2-lvl4": string;
  region: string;
  postcode: string;
  country: string;
  country_code: string;
}

export interface userLocInterface {
  searched: boolean;
  location: {
    lat: number | null;
    lon: number | null;
  };
  search_state: "loading" | "success" | "error";
}

export interface location {
  lat: number;
  lon: number;
}

export interface WeatherApp {
  city: string;
  currentConditions: CurrentWeather;
  hourlyForecast: HourlyWeather;
  dailyForecast: DailyWeather;
  todayWeather: TodayHighlights;
}

export interface TodayHighlights {
  feelsLike: {
    value: string;
    description: string;
  };

  humidity: {
    value: string;
    description: string;
  };

  uvIndex: {
    value: string;
    description: string;
  };

  visibility: {
    value: string;
    description: string;
  };
}
