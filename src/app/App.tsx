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
  const [status, setStatus] = useState("Please wait...");

  useEffect(() => {
    let ipInfoJson = localStorage.getItem("userLoc");
    const rawData: any = ipInfoJson ? JSON.parse(ipInfoJson) : null;
    if (rawData.lat && rawData.lon) {
      setStatus(
        "We already have your location! Redirecting to forecast page...",
      );
      const ipInfo: IpInfo = rawData;
      const { lat, lon } = ipInfo;
      navigate(`/forecast/${lat}/${lon}`);
    } else {
      setStatus("We don't have your location, let me search it...");
      const fetchUserLoc = async () => {
        try {
          const userIp = await getUserIp();
          const ipInfo = await getIpInfo(userIp);
          const { lat, lon } = ipInfo;
          setStatus("Found it!");
          const ipInfoString = JSON.stringify(ipInfo);
          localStorage.setItem("userLoc", ipInfoString);
          navigate(`/forecast/${lat}/${lon}`);
        } catch (e) {
          setStatus("We couldn't find your location!");
          console.log("couldn`t find the user location: " + e);
          navigate("/search");
        }
      };
      fetchUserLoc();
    }
  }, []);

  return <>{status}</>;
}

export default App;
