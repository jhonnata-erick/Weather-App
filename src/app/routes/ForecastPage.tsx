import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect } from "react";
import { validateLocation } from "../../utils/lat&lon.validation.ts";
import useWeatherStore from "../../store/weatherStore.ts";

import { LoadingPage } from "../../components/ui/Loading.tsx";
import { ForecastPageLayout } from "../../components/layout/ForecastPage-layout.tsx";
import type { location } from "../../types/app-types.ts";

export function ForecastPage() {
  const { lat, lon } = useParams<{ lat: string; lon: string }>();
  const func = useWeatherStore((state) => state.setWeatherData);
  const setAppData = useCallback(
    (location: location) => {
      return func(location);
    },
    [func],
  );
  const status = useWeatherStore((state) => state.status);
  const todayForecast = useWeatherStore((state) => state.todayForecast);
  const navigate = useNavigate();
  useEffect(() => {
    const location = { lat: Number(lat), lon: Number(lon) };

    const timer = setTimeout(() => {
      if (validateLocation(location)) {
        try {
          setAppData(location);
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
  }, [lat, lon, navigate, setAppData]);
  if (status === "error") {
    navigate(`/error`);
  }
  if (!todayForecast || status === "loading") return <LoadingPage />;

  console.log(status);
  return <ForecastPageLayout todayForecast={todayForecast} />;
}
