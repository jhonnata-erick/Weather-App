import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @ts-ignore
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./routes/NotFoundPage.tsx";
import { ForecastPage } from "./routes/ForecastPage.tsx";
import { IdlePage } from "./routes/Idle.tsx";
import { Error } from "./routes/Error.tsx";
import ConnectionLost from "./routes/ConnectionLost.tsx";
import { Start } from "./routes/Start.tsx";
import { Permission } from "./routes/Permission.tsx";
import { Offline } from "./routes/Offline.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/start", element: <Start /> },
  { path: "/permission", element: <Permission /> },
  { path: "/offline", element: <Offline /> },
  { path: "/search", element: <IdlePage /> },
  { path: "/error", element: <Error /> },
  { path: "*", element: <NotFoundPage /> },
  { path: "/connection-lost", element: <ConnectionLost /> },
  { path: "/forecast/:lat/:lon", element: <ForecastPage /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
