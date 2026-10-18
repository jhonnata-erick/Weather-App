import { useEffect, useState } from "react";
import { PermissionLayout } from "../../components/layout/Permission-layout.tsx";
import type { UserLoc } from "../../types/app-types.ts";
import { useNavigate } from "react-router-dom";

export function Permission() {
  const [userLocPermited, setPermited] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userLocPermited) {
      let rawData;
      try {
        rawData = localStorage.getItem("userLoc");
        const userLocN: null | UserLoc = rawData ? JSON.parse(rawData) : null;
        if (userLocN && userLocN.latitude && userLocN.longitude) {
          const userLoc: UserLoc = userLocN;
          const { latitude, longitude } = userLoc;
          navigate(`/forecast/${latitude}/${longitude}`);
        } else {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const userLoc = {
                latitude: latitude,
                longitude: longitude,
              };
              localStorage.setItem("userLoc", JSON.stringify(userLoc));
              navigate(`/forecast/${latitude}/${longitude}`);
            },
            (error) => {
              window.alert(error.message + " redirecting to search page");
              navigate("/search");
            },
          );
        }
      } catch (error) {
        window.alert(error + " redirecting to search page");
        navigate("/search");
      }
    }
  }, [userLocPermited, navigate]);
  return <PermissionLayout setPermited={setPermited} />;
}
