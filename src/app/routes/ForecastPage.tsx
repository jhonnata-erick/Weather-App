import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { validateLocation } from "../../utils/lat&lon.validation.ts";
import useWeatherStore from "../../store/weatherStore.ts";

import { LoadingPage } from "../../components/ui/Loading.tsx";
import { ForecastPageLayout } from "../../components/layout/ForecastPage-layout.tsx";

export function ForecastPage() {
  const { lat, lon } = useParams<{ lat: string; lon: string }>();
  const location = useRef({ lat: Number(lat), lon: Number(lon) });
  console.log(lat, lon);
  const navigate = useNavigate();

  const setAppData = useWeatherStore((state) => state.setWeatherData);
  const status = useWeatherStore((state) => state.status);
  const todayForecast = useWeatherStore((state) => state.todayForecast);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (validateLocation(location.current)) {
        try {
          setAppData(location.current);
        } catch {
          navigate(`/error`);
        }
      } else {
        navigate(`/*`);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [lat, lon, setAppData, location, navigate]);
  if (status === "error") {
    navigate(`/error`);
  }
  if (!todayForecast || status === "loading") return <LoadingPage />;

  console.log(status);
  return <ForecastPageLayout todayForecast={todayForecast} />;
}
