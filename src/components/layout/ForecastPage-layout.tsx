import { useNavigate } from "react-router-dom";
import { SearchFeature } from "../../features/search/components/SearchFeature.tsx";
import type { TodayForecast } from "../../types/app-types.ts";
import { CurrentConditions } from "../ui/WeatherApp/CurrentConditions.tsx";
import { WeatherDetails } from "../ui/WeatherApp/WeatherDetails.tsx";
import { HourlyForecast } from "../ui/WeatherApp/HourlyForecast.tsx";
import { DailyForecast } from "../ui/WeatherApp/DailyForecast.tsx";

export function ForecastPageLayout({
  todayForecast,
}: {
  todayForecast: TodayForecast;
}) {
  const navigate = useNavigate();
  console.log(todayForecast);
  return (
    <main>
      <section className="first-section">
        <SearchFeature />
        <CurrentConditions
          city={"naotemais"}
          temperature={todayForecast.current.temperature + ""}
          description={todayForecast.current.weather_status}
          current_date={todayForecast.current.date}
          current_hour={todayForecast.current.feelslike + ""}
        />
      </section>
      <section className="forecast-section">
        <HourlyForecast hourlyForecast={todayForecast.hourly} />
        <DailyForecast dailyForecast={todayForecast.daily} />
      </section>
    </main>
  );
}
