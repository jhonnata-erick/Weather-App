import type { TodayForecastDay } from "../../../types/app-types.ts";
import { WeatherIcon } from "../../weather-icon.tsx";

export const DailyForecast = ({
  dailyForecast,
}: {
  dailyForecast: TodayForecastDay[];
}) => {
  return (
    <section className="daily-forecast">
      <h2 className="forecast-section-title">Daily Forecast</h2>
      <div className="forecast-display">
        {dailyForecast.map((daily) => {
          return (
            <div key={JSON.stringify(daily)} className="daily-card">
              <div className="day-name">{daily.dayOfWeek}</div>
              <div className="weather-type">
                <div className="weather-icon">
                  <WeatherIcon code={daily.weather_code} size={20} />
                </div>
                <div className="weather-desc">{daily.description}</div>
              </div>
              <div className="temperatures">
                <div className="max-temp">{daily.max_temperature}</div>
                <div className="min-temp">{daily.min_temperature}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
