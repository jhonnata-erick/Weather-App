import type { SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import type { GeocodingResults, Location } from "../../../types/app-types.ts";

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
