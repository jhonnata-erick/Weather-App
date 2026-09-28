import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { validateLocation } from "../../utils/lat&lon.validation.ts";
import useWeatherStore from "../../store/weatherStore.ts";

import { LoadingPage } from "../../components/ui/Loading.tsx";
import { ForecastPageLayout } from "../../components/layout/ForecastPage-layout.tsx";

export function ForecastPage() {
  const { lat, lon } = useParams<{ lat: string; lon: string }>();
  const location = { lat: Number(lat), lon: Number(lon) };
  console.log(lat, lon);
  const navigate = useNavigate();

  const setAppData = useWeatherStore((state) => state.setWeatherData);
  const status = useWeatherStore((state) => state.status);
  const error = useWeatherStore((status) => status.error);
  const todayForecast = useWeatherStore((state) => state.todayForecast);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (validateLocation(location)) {
        try {
          setAppData(location);
        } catch (e) {
          navigate(`/error`);
        }
      } else {
        navigate(`/*`);
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
  if (!todayForecast || status === "loading") return <LoadingPage />;

  console.log(status);
  return <ForecastPageLayout todayForecast={todayForecast} />;
}
