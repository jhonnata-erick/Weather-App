import { WeatherIcon } from "../../weather-icon.tsx";

interface CurrentConditionsProps {
  temperature: number;
  description: string;
  feels_like: number;
  max_temp: number;
  min_temp: number;
  weather_code: number;
}

export function CurrentConditions({
  temperature,
  description,
  feels_like,
  max_temp,
  min_temp,
  weather_code,
}: CurrentConditionsProps) {
  return (
    <div className="current-forecast">
      <div className="main-info">
        <span className="temperature">{temperature}º</span>
        <div className="weather-status">
          <WeatherIcon code={weather_code} color="#ffffff" size={48} />
          <div className="status-tag">{description}</div>
        </div>
      </div>
      <div className="secondary-info">
        <span>
          Feels like {feels_like}º | Max {max_temp}º Min {min_temp}º
        </span>
      </div>
    </div>
  );
}
