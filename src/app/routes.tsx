import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "./routes/NotFoundPage.tsx";
import { ForecastPage } from "./routes/ForecastPage.tsx";
import { SearchPage } from "./routes/Idle.tsx";
import { Error } from "./routes/Error.tsx";
import { Start } from "./routes/Start.tsx";
import { Permission } from "./routes/Permission.tsx";
import { Offline } from "./routes/Offline.tsx";
import { OnlineWrapper } from "./OnlineWrapper.tsx";
import { GetStarted } from "./routes/GetStarted.tsx";

export const router = createBrowserRouter([
  {
    element: <OnlineWrapper />,
    children: [
      { path: "/", element: <Start /> },
      { path: "/start", element: <GetStarted /> },
      { path: "/permission", element: <Permission /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/error", element: <Error /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "/forecast/:lat/:lon", element: <ForecastPage /> },
    ],
  },
  { path: "/offline", element: <Offline /> },
]);
