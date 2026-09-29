// @ts-ignore
import "./App.css";
import { useEffect, useState } from "react";
import type { IpInfo } from "../types/app-types.ts";
import { useNavigate } from "react-router-dom";
import { getUserIp } from "../services/getData/getUserIp.ts";
import { getIpInfo } from "../services/getData/getIpInfo.ts";

function App() {
  console.log("on <App/>");
  const navigate = useNavigate();

  useEffect(() => {
    let ipInfoJson = localStorage.getItem("userLoc");
    const rawData: any = ipInfoJson ? JSON.parse(ipInfoJson) : null;
    console.log(rawData);
    if (rawData && rawData.lat && rawData.lon) {
      const ipInfo: IpInfo = rawData;
      console.log(ipInfo);
      const { lat, lon } = ipInfo;
      navigate(`/forecast/${lat}/${lon}`);
    } else {
      navigate("/start");
    }
  }, []);

  return <>Please wait...</>;
}

export default App;
