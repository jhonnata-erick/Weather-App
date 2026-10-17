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
    if (status === "offline") {
      setError(new Error("No internet connection"));
      navigate("/offline");
    }
    let rawData = localStorage.getItem("userLoc");
    const userLocN: null | UserLoc = rawData ? JSON.parse(rawData) : null;
    if (userLocN && userLocN.latitude && userLocN.longitude) {
      const userLoc: UserLoc = userLocN;
      const { latitude, longitude } = userLoc;
      navigate(`/forecast/${latitude}/${longitude}`);
    } else {
      navigate("/start");
    }
  }, [navigate, setError, status]);

  return <>Please wait...</>;
}

export default App;
