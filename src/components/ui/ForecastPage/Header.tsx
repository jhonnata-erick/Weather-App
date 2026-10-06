import { MapPin } from "lucide-react";
import { SearchFeature } from "../../../features/search/components/SearchFeature.tsx";
import useWeatherStore from "../../../store/weatherStore.ts";

export function ForecastHeader() {
  const currentLoc = useWeatherStore((status) => status.currentLoc);
  return (
    <>
      <div className="flex gap-2">
        <img src="/favicon.svg" alt="Weather app logo" width={48} />
        <div className="location-info-container">
          <div className="location">
            <MapPin size={20} />
            <span>{currentLoc?.city}</span>
          </div>
          <div className="localDate">
            <p>{currentLoc?.time}</p>
          </div>
        </div>
      </div>
      <SearchFeature />
    </>
  );
}
