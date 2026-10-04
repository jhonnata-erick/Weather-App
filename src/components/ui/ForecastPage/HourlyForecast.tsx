import type { TodayForecastHour } from "../../../types/app-types.ts";
import { WeatherIcon } from "../../weather-icon.tsx";
import HourlyLineGraph from "./HourlyLineGraph.tsx";

export const HourlyForecast = ({
  hourlyForecast,
}: {
  hourlyForecast: TodayForecastHour[];
}) => {
  return (
    <section className="hourly-forecast">
      <h2 className="forecast-section-title">Hourly Forecast</h2>
      <div className="weather-chart-container">
        <div className="weather-timeline">
          {hourlyForecast.map((hour, i) => (
            <HourlyLineGraph
              key={Math.random()}
              hourForecast={hour}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
