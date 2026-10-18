import { useNavigate } from "react-router-dom";
import useWeatherStore from "../../store/weatherStore.ts";
import { useEffect } from "react";
import type { UserLoc } from "../../types/app-types.ts";

export function Start() {
  const navigate = useNavigate();
  const status = useWeatherStore((s) => s.status);
  const setError = useWeatherStore((s) => s.setError);
  useEffect(() => {
    let rawData;
    try {
      rawData = localStorage.getItem("userLoc");
      const userLocN: null | UserLoc = rawData ? JSON.parse(rawData) : null;
      if (
        status !== "offline" &&
        userLocN &&
        userLocN.latitude &&
        userLocN.longitude
      ) {
        const userLoc: UserLoc = userLocN;
        const { latitude, longitude } = userLoc;
        navigate(`/forecast/${latitude}/${longitude}`);
      } else {
        navigate("/start");
      }
    } catch (error) {
      window.alert(error + " redirecting to search page");
      navigate("/search");
    }
  }, [navigate, setError, status]);
  return <>Please wait...</>;
}
