import type { DailyWeather } from "../../../types/api-types.ts";
import { WeatherIcon } from "../../weather-icon.tsx";

export const DailyForecast = ({
  dailyForecast,
}: {
  dailyForecast: DailyWeather;
}) => {
  return (
    <section className="daily-forecast">
      <h2 className="forecast-section-title">Daily Forecast</h2>
      <div className="forecast-display">
        {dailyForecast.map((daily) => {
          return (
            <div
              key={daily.day_of_week + daily.max_temp}
              className="daily-card"
            >
              <div className="day-name">{daily.day_of_week}</div>
              <div className="weather-type">
                <div className="weather-icon">
                  <WeatherIcon code={daily.weather_code} size={20} />
                </div>
                <div className="weather-desc">{daily.weather_type}</div>
              </div>
              <div className="temperatures">
                <div className="max-temp">{daily.max_temp}</div>
                <div className="min-temp">{daily.min_temp}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
