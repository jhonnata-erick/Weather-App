// ===== API RESPONSE LAYER ===== //

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

// ====== Nomatim geocoding ====== //
export interface Nomatim {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
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

// ====== OpenMeteo ===== //
export interface ApiParams {
  latitude: number;
  longitude: number;
  daily: string[];
  hourly: string[];
  models: string;
  current: string[];
  timezone: string;
  past_days: number;
  forecast_days: number;
  forecast_hours: number;
  past_hours: number;
  forecast_minutely_15: number;
  past_minutely_15: number;
}
export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string | null;
  timezone_abbreviation: string | null;
  elevation: number;
  current_units: {
    time: "iso8601";
    interval: "seconds";
    temperature_2m: "°C";
    relative_humidity_2m: "%";
    apparent_temperature: "°C";
    precipitation: "mm";
    rain: "mm";
    showers: "mm";
    snowfall: "cm";
    weather_code: "wmo code";
    surface_pressure: "hPa";
    cloud_cover: "%";
    wind_speed_10m: "km/h";
    wind_gusts_10m: "km/h";
    wind_direction_10m: "°";
    is_day: "";
  };
  current: OpenMeteoCurrently;
  hourly_units: {
    time: "iso8601";
    precipitation_probability: "%";
    snow_depth: "m";
    cloud_cover: "%";
    visibility: "m";
    uv_index: "";
    weather_code: "wmo code";
    surface_pressure: "hPa";
    showers: "mm";
    temperature_2m: "°C";
    relative_humidity_2m: "%";
    dew_point_2m: "°C";
    apparent_temperature: "°C";
    rain: "mm";
    snowfall: "cm";
    wind_speed_10m: "km/h";
    wind_gusts_10m: "km/h";
    wind_direction_10m: "°";
  };
  hourly: OpenMeteoHourly;
  daily_units: {
    time: "iso8601";
    temperature_2m_max: "°C";
    temperature_2m_min: "°C";
    moon_phase: "fraction";
    precipitation_probability_max: "%";
    weather_code: "wmo code";
    uv_index_max: "";
    sunrise: "iso8601";
    sunset: "iso8601";
    uv_index_clear_sky_max: "";
  };
  daily: OpenMeteoDaily;
}
export interface OpenMeteoCurrently {
  time: string;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  rain: number;
  showers: number;
  snowfall: number;
  weather_code: number;
  surface_pressure: number;
  cloud_cover: number;
  wind_speed_10m: number;
  wind_gusts_10m: number;
  wind_direction_10m: number;
  is_day: number;
}
export interface OpenMeteoMinutely15 {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  dew_point_2m: number[];
  apparent_temperature: number[];
  precipitation: number[];
  rain: number[];
  snowfall: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  wind_gusts_10m: number[];
  visibility: number[];
  is_day: number[];
}
export interface OpenMeteoHourly {
  time: string[];
  precipitation_probability: number[];
  snow_depth: number[];
  cloud_cover: number[];
  visibility: number[];
  uv_index: number[];
  weather_code: number[];
  surface_pressure: number[];
  showers: number[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  dew_point_2m: number[];
  apparent_temperature: number[];
  rain: number[];
  snowfall: number[];
  wind_speed_10m: number[];
  wind_gusts_10m: number[];
  wind_direction_10m: number[];
}

export interface OpenMeteoDaily {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  moon_phase: number[];
  precipitation_probability_max: number[];
  weather_code: number[];
  uv_index_max: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_clear_sky_max: number[];
}

// ===== APP DATA LAYER ===== //

export interface TodayForecast {
  current: TodayForecastCurrent;
  hourly: TodayForecastHour[];
  daily: TodayForecastDay[];
}
export interface TodayForecastCurrent {
  date: string;
  temperature: number;
  weather_status: string;
  feelslike: number;
}
export interface TodayForecastHour {
  hour: string;
  temperature: string;
  weather_code: number;
  past: boolean;
  isDay: boolean;
  precipitation_chance: number;
}
export interface TodayForecastDay {
  dayOfWeek: string;
  day: number;
  max_temperature: string;
  min_temperature: string;
  precipitation_chance?: string;
  description: string;
  weather_code: number;
}
export interface HourlyForecast {
  hourly: {
    hour: number;
    precipitation_chance: number;
    temperature: number;
    wind_speed: string;
    wind_direction: string;
    weather_status: string;
    feelslike: number;
    atpression: string;
    winds_gust: number;
    cloud_cover: number;
    dewpoint: number;
    uv_index: number;
    visibility: number;
    air_quality: number;
    humidity: number;
  }[];
}

export interface DailyForecast {
  daily: {
    day: number;
    dayOfWeek: string;
    day_desc: string;
    max_temp: number;
    min_temp: number;
    weather_state: string;
    precipitation_chance: number;
    moon_phase: number;
    uv_index: number;
    sunrise: string;
    sunset: string;
  }[];
}

export interface location {
  lat: number;
  lon: number;
}
export interface locationInfo {
  id: string;
  name: string;
  city: string;
  state: string;
  country: string;
  time: string;
  location: location;
  timesQueried: number;
}

export interface GeocodingResults {
  generationtime_ms?: number;
  results?: Location[];
}
export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  admin3_id: number;
  admin4_id: number;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
}
