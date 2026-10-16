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

  useEffect(() => {
    if (status === "offline") {
      setError(new Error("No internet connection"));
      navigate("/offline");
    }
    let ipInfoJson = localStorage.getItem("userLoc");
    const rawData: any = ipInfoJson ? JSON.parse(ipInfoJson) : null;
    if (rawData && rawData.lat && rawData.lon) {
      const ipInfo: IpInfo = rawData;
      const { lat, lon } = ipInfo;
      navigate(`/forecast/${lat}/${lon}`);
    } else {
      navigate("/start");
    }
  }, [navigate, setError, status]);

  return <>Please wait...</>;
}

export default App;
