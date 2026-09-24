import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { validateLocation } from "../../utils/lat&lon.validation.ts";
import useWeatherStore from "../../store/weatherStore.ts";

import { LoadingPage } from "../../components/ui/Loading.tsx";
import { ForecastPageLayout } from "../../components/layout/ForecastPage-layout.tsx";

export function ForecastPage() {
  const { lat, lon } = useParams<{ lat: string; lon: string }>();
  const location = { lat: Number(lat), lon: Number(lon) };

  const navigate = useNavigate();

  const getWeatherAppData = useWeatherStore((state) => state.getWeatherAppData);
  const status = useWeatherStore((state) => state.status);
  const error = useWeatherStore((status) => status.error);
  const WeatherAppData = useWeatherStore((state) => state.WeatherAppData);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (validateLocation(location)) {
        try {
          getWeatherAppData(location);
        } catch (e) {
          navigate(`/error`);
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [lat, lon]);
  if (status === "error") {
    console.log("foda em" + error);
    navigate(`/error/${error}`);
  }
  if (!WeatherAppData || status === "loading") return <LoadingPage />;

  console.log(status);
  return <ForecastPageLayout WeatherAppData={WeatherAppData} />;
}
