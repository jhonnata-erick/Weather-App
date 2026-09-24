import type { HourlyWeather } from "../../../types/api-types.ts";
import { WeatherIcon } from "../../weather-icon.tsx";

export const HourlyForecast = ({
  hourlyForecast,
}: {
  hourlyForecast: HourlyWeather;
}) => {
  return (
    <section className="hourly-forecast">
      <h2 className="forecast-section-title">Hourly Forecast</h2>
      <div className="hourly-display">
        {hourlyForecast.map((hourly) => {
          return (
            <div key={hourly.temp + hourly.hour} className="hourly-card">
              <div className="hourly-hour">{hourly.hour}</div>
              <div className="hourly-icon-container">
                <WeatherIcon code={hourly.weather_code} isDay={hourly.isDay} />
              </div>
              <div className="hourly-temperature">{hourly.temp}</div>
              {Number(
                [...hourly.precipitation_chance]
                  .filter((l) => l !== "%")
                  .join(""),
              ) > 0 && (
                <div className="hourly-precipitation">
                  {hourly.precipitation_chance}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
