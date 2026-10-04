import { ChevronDown, MapPin } from "lucide-react";
import { SearchFeature } from "../../../features/search/components/SearchFeature.tsx";

export function ForecastHeader() {
  return (
    <>
      <div className="flex gap-2">
        <img src="/favicon.svg" alt="Weather app logo" width={48} />
        <div className="location-info-container">
          <div className="location">
            <MapPin size={20} />
            <span>Aqui</span>
            <button className="more">
              <ChevronDown />
            </button>
          </div>
          <div className="localDate">
            <p>Agora</p>
          </div>
        </div>
      </div>
      <SearchFeature />
    </>
  );
}
