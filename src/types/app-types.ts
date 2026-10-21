// ===== API RESPONSE LAYER ===== //

export type UserLoc = {
  latitude: number;
  longitude: number;
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
  city_district?: string;
  city: string;
  state: string;
  "ISO3166-2-lvl4": string;
  region: string;
  postcode: string;
  country: string;
  country_code: string;
}

// ====== OpenMeteo ===== //
export interface OpenMeteoParams {
  latitude: number;
  longitude: number;
  daily?: OpenMeteoDailyParams | OpenMeteoDailyParams[];
  hourly?: OpenMeteoHourlyParams | OpenMeteoHourlyParams[];
  models?: OpenMeteoModels | OpenMeteoModels[];
  current?: OpenMeteoCurrentParams | OpenMeteoCurrentParams[];
  minutely_15?: OpenMeteoMinutely15Params | OpenMeteoMinutely15Params[];
  timezone: string;
  past_days: number;
  forecast_days: number;
  forecast_hours: number;
  past_hours: number;
  forecast_minutely_15?: number;
  past_minutely_15?: number;
}
const openmeteoDailyParamsPermited = [
  "temperature_2m_max",
  "temperature_2m_min",
  "moon_phase",
  "precipitation_probability_max",
  "weather_code",
  "uv_index_max",
  "sunrise",
  "sunset",
  "uv_index_clear_sky_max",
  "apparent_temperature_max",
  "apparent_temperature_min",
  "daylight_duration",
  "moonrise",
  "sunshine_duration",
  "moonset",
  "rain_sum",
  "showers_sum",
  "snowfall_sum",
  "precipitation_sum",
  "precipitation_hours",
  "wind_speed_10m_max",
  "wind_direction_10m_dominant",
  "wind_gusts_10m_max",
  "shortwave_radiation_sum",
  "et0_fao_evapotranspiration",
] as const;

export type OpenMeteoDailyParams =
  (typeof openmeteoDailyParamsPermited)[number];

const openmeteoHourlyParams = [
  "precipitation_probability",
  "snow_depth",
  "cloud_cover",
  "visibility",
  "uv_index",
  "weather_code",
  "surface_pressure",
  "showers",
  "temperature_2m",
  "relative_humidity_2m",
  "dew_point_2m",
  "apparent_temperature",
  "rain",
  "snowfall",
  "wind_speed_10m",
  "wind_gusts_10m",
  "wind_direction_10m",
  "precipitation",
  "pressure_msl",
  "cloud_cover_low",
  "cloud_cover_mid",
  "cloud_cover_high",
  "wind_speed_80m",
  "wind_speed_120m",
  "wind_speed_180m",
  "wind_direction_80m",
  "wind_direction_120m",
  "wind_direction_180m",
  "evapotranspiration",
  "et0_fao_evapotranspiration",
  "vapour_pressure_deficit",
  "temperature_80m",
  "temperature_120m",
  "temperature_180m",
  "soil_temperature_0cm",
  "soil_temperature_6cm",
  "soil_temperature_18cm",
  "soil_moisture_0_to_1cm",
  "soil_temperature_54cm",
  "soil_moisture_1_to_3cm",
  "soil_moisture_3_to_9cm",
  "soil_moisture_9_to_27cm",
  "soil_moisture_27_to_81cm",
  "uv_index_clear_sky",
  "sunshine_duration",
  "is_day",
  "wet_bulb_temperature_2m",
  "total_column_integrated_water_vapour",
  "cape",
  "convective_inhibition",
  "lifted_index",
  "freezing_level_height",
  "boundary_layer_height",
] as const;
export type OpenMeteoHourlyParams = (typeof openmeteoHourlyParams)[number];

const openmeteoModels = [
  "best_match",
  "ecmwf_ifs",
  "ecmwf_ifs025",
  "ecmwf_aifs025_single",
  "cma_grapes_global",
  "bom_access_global",
  "ncep_gfs_seamless",
  "ncep_gfs_global",
  "ncep_hrrr_conus",
  "ncep_nbm_conus",
  "ncep_nam_conus",
  "ncep_aigfs025",
  "ncep_hgefs025_ensemble_mean",
  "jma_seamless",
  "jma_msm",
  "jma_gsm",
  "kma_seamless",
  "kma_ldps",
  "kma_gdps",
  "dwd_icon_seamless",
  "dwd_icon_global",
  "dwd_icon_global_native",
  "dwd_icon_eu",
  "dwd_icon_eu_native",
  "dwd_icon_d2",
  "dwd_icon_d2_native",
  "cmc_gem_seamless",
  "cmc_gem_gdps",
  "cmc_gem_rdps",
  "cmc_gem_hrdps",
  "cmc_gem_hrdps_west",
  "meteofrance_seamless",
  "meteofrance_arpege_world",
  "meteofrance_arpege_europe",
  "meteofrance_arome_france",
  "meteofrance_arome_france_hd",
  "italia_meteo_arpae_icon_2i",
  "metno_seamless",
  "metno_nordic",
  "knmi_seamless",
  "knmi_harmonie_arome_europe",
  "knmi_harmonie_arome_netherlands",
  "dmi_seamless",
  "dmi_harmonie_arome_europe",
  "ukmo_seamless",
  "ukmo_global_deterministic_10km",
  "ukmo_uk_deterministic_2km",
  "meteoswiss_icon_seamless",
  "meteoswiss_icon_ch1",
  "meteoswiss_icon_ch2",
  "geosphere_seamless",
  "geosphere_arome_austria",
  "chmi_aladin_seamless",
  "chmi_aladin_central_europe_2km",
  "chmi_aladin_cz_1km",
] as const;
export type OpenMeteoModels = (typeof openmeteoModels)[number];

const openmeteoCurrentParams = [
  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "precipitation",
  "rain",
  "showers",
  "snowfall",
  "weather_code",
  "surface_pressure",
  "cloud_cover",
  "wind_speed_10m",
  "wind_gusts_10m",
  "wind_direction_10m",
  "is_day",
  "pressure_msl",
] as const;

export type OpenMeteoCurrentParams = (typeof openmeteoCurrentParams)[number];

const openmeteoMinutely15Params = [
  "temperature_2m",
  "relative_humidity_2m",
  "dew_point_2m",
  "apparent_temperature",
  "precipitation",
  "rain",
  "snowfall",
  "snowfall_height",
  "freezing_level_height",
  "sunshine_duration",
  "weather_code",
  "wind_speed_10m",
  "wind_speed_80m",
  "wind_direction_10m",
  "wind_direction_80m",
  "wind_gusts_10m",
  "visibility",
  "cape",
  "lightning_potential",
  "is_day",
  "shortwave_radiation",
  "direct_radiation",
  "diffuse_radiation",
  "direct_normal_irradiance",
  "global_tilted_irradiance",
  "terrestrial_radiation",
  "shortwave_radiation_instant",
  "direct_radiation_instant",
  "diffuse_radiation_instant",
  "direct_normal_irradiance_instant",
  "global_tilted_irradiance_instant",
  "terrestrial_radiation_instant",
] as const;

export type OpenMeteoMinutely15Params =
  (typeof openmeteoMinutely15Params)[number];

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string | null;
  timezone_abbreviation: string | null;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    precipitation: string;
    rain: string;
    showers: string;
    snowfall: string;
    weather_code: string;
    surface_pressure: string;
    cloud_cover: string;
    wind_speed_10m: string;
    wind_gusts_10m: string;
    wind_direction_10m: string;
    is_day: string;
  };
  current: OpenMeteoCurrently;
  hourly_units: {
    time: string;
    precipitation_probability: string;
    snow_depth: string;
    cloud_cover: string;
    visibility: string;
    uv_index: string;
    weather_code: string;
    surface_pressure: string;
    showers: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    dew_point_2m: string;
    apparent_temperature: string;
    rain: string;
    snowfall: string;
    wind_speed_10m: string;
    wind_gusts_10m: string;
    wind_direction_10m: string;
  };
  hourly: OpenMeteoHourly;
  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    moon_phase: string;
    precipitation_probability_max: string;
    weather_code: string;
    uv_index_max: string;
    sunrise: string;
    sunset: string;
    uv_index_clear_sky_max: string;
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
  weather_code: number;
  isDay: number;
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
