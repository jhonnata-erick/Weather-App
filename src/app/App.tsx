// @ts-ignore
import "./App.css";
import { useEffect } from "react";
import type { IpInfo } from "../types/app-types.ts";
import { useNavigate } from "react-router-dom";
import useWeatherStore from "../store/weatherStore.ts";

function App() {
  const navigate = useNavigate();
  const status = useWeatherStore((s) => s.status);
  const setError = useWeatherStore((s) => s.setError);

  if (status === "offline") {
    setError(new Error("No internet connection"));
    navigate("/offline");
    return <>you are offline</>;
  }

  useEffect(() => {
    let ipInfoJson = localStorage.getItem("userLoc");
    const rawData: any = ipInfoJson ? JSON.parse(ipInfoJson) : null;
    if (rawData && rawData.lat && rawData.lon) {
      const ipInfo: IpInfo = rawData;
      const { lat, lon } = ipInfo;
      navigate(`/forecast/${lat}/${lon}`);
    } else {
      navigate("/start");
    }
  }, []);

  return <>Please wait...</>;
}

export default App;
