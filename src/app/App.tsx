// @ts-ignore
import "./App.css";
import { useEffect } from "react";
import type { UserLoc } from "../types/app-types.ts";
import { useNavigate } from "react-router-dom";
import useWeatherStore from "../store/weatherStore.ts";

function App() {
  const navigate = useNavigate();
  const status = useWeatherStore((s) => s.status);
  const setError = useWeatherStore((s) => s.setError);

  useEffect(() => {
    let rawData = localStorage.getItem("userLoc");
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
  }, [navigate, setError, status]);
  if (status === "offline") {
    setError(new Error("No internet connection"));
    navigate("/offline");
    return <>offline</>;
  }
  return <>Please wait...</>;
}

export default App;
