import type {
  RawCurrentWeather,
  TodayHighlights,
  WeatherForecastData,
} from "../../types/api-types.ts";

export function todayWeatherAdapter(
  weatherData: WeatherForecastData,
): TodayHighlights {
  const { current, hourly } = weatherData;

  const currentHour = current.time.slice(0, 13);

  const hourlyIndex = hourly.time.findIndex(
    (time) => time.slice(0, 13) === currentHour,
  );

  const uvIndex = hourly.uv_index?.[hourlyIndex] ?? 0;
  const visibility = hourly.visibility?.[hourlyIndex] ?? 0;

  return {
    feelsLike: {
      value: `${Math.round(current.apparent_temperature)}°`,
      description: getFeelsLikeDescription(
        current.apparent_temperature,
        current.temperature_2m,
      ),
    },

    humidity: {
      value: `${Math.round(current.relative_humidity_2m)}%`,
      description: getHumidityDescription(current.relative_humidity_2m),
    },

    uvIndex: {
      value: formatUvIndex(uvIndex),
      description: getUvDescription(uvIndex),
    },

    visibility: {
      value: formatVisibility(visibility),
      description: getVisibilityDescription(visibility),
    },
  };
}

function getFeelsLikeDescription(
  apparentTemperature: number,
  temperature: number,
): string {
  if (apparentTemperature > temperature) {
    return "Feels warmer than actual";
  }

  if (apparentTemperature < temperature) {
    return "Feels cooler than actual";
  }

  return "Feels like the actual temperature";
}

function getHumidityDescription(humidity: number): string {
  if (humidity >= 70) {
    return "High humidity";
  }

  if (humidity >= 40) {
    return "Comfortable humidity";
  }

  return "Low humidity";
}

function formatUvIndex(uvIndex: number): string {
  const value = Math.round(uvIndex);

  let level = "Low";

  if (value >= 3 && value <= 5) {
    level = "Mod";
  } else if (value >= 6 && value <= 7) {
    level = "High";
  } else if (value >= 8 && value <= 10) {
    level = "Very High";
  } else if (value >= 11) {
    level = "Extreme";
  }

  return `${value} (${level})`;
}

function getUvDescription(uvIndex: number): string {
  if (uvIndex < 3) {
    return "No protection needed";
  }

  if (uvIndex < 6) {
    return "Sun protection needed";
  }

  if (uvIndex < 8) {
    return "Extra protection needed";
  }

  return "Avoid sun exposure";
}

function formatVisibility(visibility: number): string {
  const kilometers = visibility / 1000;

  if (kilometers >= 10) {
    return "10+ km";
  }

  return `${kilometers.toFixed(1)} km`;
}

function getVisibilityDescription(visibility: number): string {
  const kilometers = visibility / 1000;

  if (kilometers >= 10) {
    return "Perfectly clear view";
  }

  if (kilometers >= 5) {
    return "Good visibility";
  }

  if (kilometers >= 1) {
    return "Reduced visibility";
  }

  return "Very poor visibility";
}
