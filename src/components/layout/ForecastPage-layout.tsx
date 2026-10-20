import "./ForecastPage-styles.css";
import type { TodayForecast } from "../../types/app-types.ts";
import { CurrentConditions } from "../ui/ForecastPage/CurrentConditions.tsx";
import { HourlyForecast } from "../ui/ForecastPage/HourlyForecast.tsx";
import { DailyForecast } from "../ui/ForecastPage/DailyForecast.tsx";
import { ForecastHeader } from "../ui/ForecastPage/Header.tsx";
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
            max_temp={todayForecast.daily[1]!.max_temperature}
            min_temp={todayForecast.daily[1]!.min_temperature}
            isDay={todayForecast.current.isDay}
            weather_code={todayForecast.current.weather_code}
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
      <footer className="w-full max-w-2xl mx-auto px-4 py-8 text-center text-sm text-slate-500 border-t border-slate-200 dark:border-slate-800 dark:text-slate-400">
        <p className="mb-2">
          This simple weather app shows you your current weather, hourly
          forecast, and daily forecast.
        </p>
        <p className="mb-4">
          My main goal is to improve my abilities with UX, system design,
          performance, and accessibility.
        </p>
        <p>
          My github page:
          <a
            href="https://github.com/jhonnata-erick"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 hover:underline font-medium transition-colors"
          >
            jhonnata-erick
          </a>
        </p>
      </footer>
    </>
  );
}
