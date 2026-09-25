import { useNavigate } from "react-router-dom";
import { SearchFeature } from "../../features/search/components/SearchFeature.tsx";
import type { WeatherApp } from "../../types/app-types.ts";
import { CurrentConditions } from "../ui/WeatherApp/CurrentConditions.tsx";
import { WeatherDetails } from "../ui/WeatherApp/WeatherDetails.tsx";
import { HourlyForecast } from "../ui/WeatherApp/HourlyForecast.tsx";
import { DailyForecast } from "../ui/WeatherApp/DailyForecast.tsx";

export function ForecastPageLayout({
  WeatherAppData,
}: {
  WeatherAppData: WeatherApp;
}) {
  const navigate = useNavigate();
  return (
    <main>
      <section className="first-section">
        <SearchFeature />
        <CurrentConditions
          city={WeatherAppData.city}
          temperature={WeatherAppData.currentConditions.temperature}
          description={WeatherAppData.currentConditions.description}
          current_date={WeatherAppData.currentConditions.current_date}
          current_hour={WeatherAppData.currentConditions.current_hour}
        />
        <WeatherDetails todayWeather={WeatherAppData.todayWeather} />
      </section>
      <section className="forecast-section">
        <HourlyForecast hourlyForecast={WeatherAppData.hourlyForecast} />
        <DailyForecast dailyForecast={WeatherAppData.dailyForecast} />
      </section>
    </main>
  );
}
