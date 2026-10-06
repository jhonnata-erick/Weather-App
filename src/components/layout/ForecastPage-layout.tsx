// @ts-expect-error CSS side-effect imports are handled by the bundler.
import "./ForecastPage-styles.css";
import type { TodayForecast } from "../../types/app-types.ts";
import { CurrentConditions } from "../ui/ForecastPage/CurrentConditions.tsx";
import { HourlyForecast } from "../ui/ForecastPage/HourlyForecast.tsx";
import { DailyForecast } from "../ui/ForecastPage/DailyForecast.tsx";
import { ForecastHeader } from "../ui/ForecastPage/Header.tsx";
import { useState } from "react";
import { createLucideIcon } from "lucide-react";

const Minus = createLucideIcon("minus", [
  ["path", { d: "M0 12h24", key: "9i4pu4" }],
]);

export function ForecastPageLayout({
  todayForecast,
}: {
  todayForecast: TodayForecast;
}) {
  return (
    <>
      <main>
        <section className="skyimage">
          <header className="forecast-header">
            <ForecastHeader />
          </header>
          <CurrentConditions
            temperature={todayForecast.current.temperature}
            description={todayForecast.current.weather_status}
            feels_like={todayForecast.current.feelslike}
            max_temp={25}
            min_temp={18}
            weather_code={1}
          />
        </section>
        <section className="forecast-details">
          <Minus className="mx-auto" strokeWidth={2} />
          <div className="flex flex-col items-center pb-4">
            <strong className="text-lg">Today Details</strong>
          </div>
          <HourlyForecast hourlyForecast={todayForecast.hourly} />
          <DailyForecast dailyForecast={todayForecast.daily} />
        </section>
      </main>
      <nav></nav>
      <footer>
        <p>
          This simple weather app shows you your current weather, hourly
          forecast, and daily forecast.
        </p>
        <p>
          My main goal is to improve my abilities with UX, system design,
          performance, and accessibility
        </p>
        <p>
          My github page:
          <a href="https://github.com/jhonnata-erick">jhonnata-erick</a>
        </p>
        <br />
      </footer>
    </>
  );
}
