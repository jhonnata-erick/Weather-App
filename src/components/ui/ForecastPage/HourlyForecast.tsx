import { useEffect, useRef } from "react";
import type { TodayForecastHour } from "../../../types/app-types.ts";
import { WeatherIcon } from "../../weather-icon.tsx";
import HourlyLineGraph from "./HourlyLineGraph.tsx";

export const HourlyForecast = ({
  hourlyForecast,
}: {
  hourlyForecast: TodayForecastHour[];
}) => {
  const focusRef = useRef<null | HTMLAnchorElement>(null);

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
    }
  }, []);
  return (
    <section className="hourly-forecast">
      <h2 className="forecast-section-title">Hourly Forecast</h2>
      <div className="weather-chart-container">
        <div className="weather-timeline">
          {hourlyForecast.map((hour, i) => (
            <HourlyLineGraph
              ref={focusRef}
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
