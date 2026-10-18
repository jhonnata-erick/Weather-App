import { Navigate, Outlet } from "react-router-dom";
import useWeatherStore from "../store/weatherStore.ts";

export function OnlineWrapper() {
  const status = useWeatherStore((s) => s.status);
  if (status === "offline") {
    return <Navigate to={"/offline"} replace />;
  }

  return <Outlet />;
}
