import type { TodayForecastHour } from "../../../types/app-types.ts";
import { WeatherIcon } from "../../weather-icon.tsx";

export default function HourlyLineGraph({
  hourForecast,
  index,
}: {
  hourForecast: TodayForecastHour;
  index: number;
}) {
  const isNow = hourForecast.hour === "Now";
  const classNames: string = isNow
    ? "time-column active"
    : hourForecast.past
      ? "time-column inactive"
      : "time-column";

  return (
    <a
      className={classNames}
      onLoad={(e) => {
        if (isNow) e.currentTarget.focus();
      }}
    >
      <p className="time">{hourForecast.hour}</p>
      <div className="icon">
        <WeatherIcon
          code={hourForecast.weather_code}
          isDay={hourForecast.isDay}
        />
      </div>
      <p className="temp">{hourForecast.temperature}</p>
    </a>
  );
}
