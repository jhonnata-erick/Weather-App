import type { SetStateAction } from "react";
import { useNavigate, type NavigateFunction } from "react-router-dom";

export interface GeocodingResults {
  generationtime_ms?: number;
  results?: Location[];
}
interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id: number;
  admin2_id: number;
  admin3_id: number;
  admin4_id: number;
  timezone: string;
  population: number;
  postcodes: string[];
  country_id: number;
  country: string;
  admin1: string;
  admin2: string;
  admin3: string;
  admin4: string;
}
export function LocationsList({
  locationsList,
  setLocations,
  setSearchData,
}: {
  locationsList: GeocodingResults;
  setLocations: React.Dispatch<SetStateAction<GeocodingResults | null>>;
  setSearchData: React.Dispatch<React.SetStateAction<string>>;
}) {
  const navigate = useNavigate();
  if (locationsList.results !== undefined) {
    const locationsResults = locationsList.results.map((location: Location) => {
      return (
        <li key={location.id}>
          <button
            onClick={() => {
              setLocations(null);
              setSearchData("");
              navigate(`/forecast/${location.latitude}/${location.longitude}`);
            }}
            className="border-4"
          >
            <div className="">{location.name}</div>
            <div>
              {location.admin2} | {location.admin1} | {location.country}
            </div>
          </button>
        </li>
      );
    });
    return <ol>{locationsResults}</ol>;
  } else if (locationsList === null) {
    return;
  } else {
    return <p>sem resultados patrao</p>;
  }
}
