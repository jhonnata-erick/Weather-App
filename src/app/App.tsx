import "./App.css";
import { useEffect } from "react";
import useWeatherStore from "../store/weatherStore.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";

function App() {
  const { initConnectionListener } = useWeatherStore.getState();
  useEffect(() => {
    const cleanup = initConnectionListener();
    return () => cleanup();
  }, [initConnectionListener]);

  return <RouterProvider router={router} />;
}

export default App;
