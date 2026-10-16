import { useEffect, useRef } from "react";
import type { TodayForecastHour } from "../../../types/app-types.ts";
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
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, []);
  return (
    <section className="hourly-forecast">
      <h2 className="forecast-section-title">Hourly Forecast</h2>
      <div className="weather-chart-container">
        <div className="weather-timeline">
          {hourlyForecast.map((hour) => (
            <HourlyLineGraph
              ref={focusRef}
              key={Math.random()}
              hourForecast={hour}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
