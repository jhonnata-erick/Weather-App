import { Navigate, useNavigate, useParams } from "react-router-dom";
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
        setAppData(location);
      } else {
        navigate(`/error`);
      }
    }, 1000 /*A Api openmeteo tem um limite de requisições de 1 por 1 segundo, ent esse timeout foi definido por segurança quando comecei o projeto. */);
    return () => {
      clearTimeout(timer);
    };
  }, [lat, lon, navigate, setAppData]);
  if (status === "error") {
    return <Navigate to={`/error`} />;
  }
  if (!todayForecast || status === "loading") return <LoadingPage />;

  return <ForecastPageLayout todayForecast={todayForecast} />;
}
