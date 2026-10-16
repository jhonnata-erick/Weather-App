import { StartLayout } from "../../components/layout/StartPage-layout.tsx";
import { getIpInfo } from "../../services/getData/getIpInfo.ts";
import { getUserIp } from "../../services/getData/getUserIp.ts";

export function Start() {
  const fetchIpInfo = async () => {
    try {
      const userIp = await getUserIp();
      const ipInfo = await getIpInfo(userIp);
      const ipInfoString = JSON.stringify(ipInfo);
      localStorage.setItem("userLoc", ipInfoString);
    } catch (e) {
      console.log("couldn`t find the user location: " + e);
    }
  };
  fetchIpInfo();
  return <StartLayout />;
}
