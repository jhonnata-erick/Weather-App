import { MapPinCheck } from "lucide-react";
import type { CurrentWeather } from "../../../types/api-types.ts";

interface CurrentConditionsProps {
  city: string;
  temperature: string;
  description: string;
  current_date: string;
  current_hour: string;
}

export function CurrentConditions({
  city,
  temperature,
  description,
  current_date,
  current_hour,
}: CurrentConditionsProps) {
  return (
    <div className="weather-container">
      <div className="weather-header">
        <div className="top-row">
          <div className="location-info-container">
            <div className="location">
              <MapPinCheck />
              {city}
            </div>

            <div>{current_date}</div>
          </div>
          <div className="status-tag">{description}</div>
        </div>
        <div className="temperature-wrapper">
          <span className="temperature">{temperature}</span>
        </div>
      </div>
    </div>
  );
}
