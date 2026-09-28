import type { TodayForecastHour } from "../../../types/app-types.ts";
import { WeatherIcon } from "../../weather-icon.tsx";

export const HourlyForecast = ({
  hourlyForecast,
}: {
  hourlyForecast: TodayForecastHour[];
}) => {
  return (
    <section className="hourly-forecast">
      <h2 className="forecast-section-title">Hourly Forecast</h2>
      <div className="hourly-display">
        {hourlyForecast.map((hourly) => {
          return (
            <div key={hourly.hour} className="hourly-card">
              <div className="hourly-hour">{hourly.hour}</div>
              <div className="hourly-icon-container">
                <WeatherIcon code={2} isDay={true} />
              </div>
              <div className="hourly-temperature">{hourly.temperature}</div>
              {Number([..."0%"].filter((l) => l !== "%").join("")) > 0 && (
                <div className="hourly-precipitation">{"2%"}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
