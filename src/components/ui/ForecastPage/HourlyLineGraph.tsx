import type { TodayForecastHour } from "../../../types/app-types.ts";
import { WeatherIcon } from "../../weather-icon.tsx";

export default function HourlyLineGraph({
  ref,
  hourForecast,
}: {
  ref: React.RefObject<null | HTMLDivElement>;
  hourForecast: TodayForecastHour;
}) {
  const isNow = hourForecast.hour === "Now";
  const classNames: string = isNow
    ? "time-column active"
    : hourForecast.past
      ? "time-column inactive"
      : "time-column";
  return (
    <div className={classNames} ref={isNow ? ref : null}>
      <p className="time">{hourForecast.hour}</p>
      <div className="icon">
        <WeatherIcon
          code={hourForecast.weather_code}
          isDay={hourForecast.isDay}
        />
      </div>
      <p className="temp">{hourForecast.temperature}</p>
      {hourForecast.precipitation_chance > 4 && (
        <p className="precipitation-chance">
          {hourForecast.precipitation_chance + "%"}
        </p>
      )}
    </div>
  );
}
