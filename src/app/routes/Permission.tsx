import { useEffect, useState } from "react";
import { PermissionLayout } from "../../components/layout/Permission-layout.tsx";
import type { IpInfo } from "../../types/app-types.ts";
import { useNavigate } from "react-router-dom";
import { getUserIp } from "../../services/getData/getUserIp.ts";
import { getIpInfo } from "../../services/getData/getIpInfo.ts";

export function Permission() {
  const [userLocPermited, setPermited] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (userLocPermited) {
      let ipInfoJson = localStorage.getItem("userLoc");
      const rawData: any = ipInfoJson ? JSON.parse(ipInfoJson) : null;
      if (rawData.lat && rawData.lon) {
        const ipInfo: IpInfo = rawData;
        const { lat, lon } = ipInfo;
        navigate(`/forecast/${lat}/${lon}`);
      } else {
        const fetchUserLoc = async () => {
          try {
            const userIp = await getUserIp();
            const ipInfo = await getIpInfo(userIp);
            const ipInfoString = JSON.stringify(ipInfo);
            localStorage.setItem("userLoc", ipInfoString);
            const { lat, lon } = ipInfo;
            navigate(`/forecast/${lat}/${lon}`);
          } catch (e) {
            console.log("couldn't find the user location: " + e);
          }
        };
        fetchUserLoc();
      }
    }
  }, [userLocPermited, navigate]);
  return <PermissionLayout setPermited={setPermited} />;
}
