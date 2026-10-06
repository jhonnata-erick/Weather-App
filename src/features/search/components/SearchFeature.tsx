import { useEffect, useState } from "react";
import { getSearchLocation } from "../../../services/getData/getSearchLocation.ts";
import { useDebounce } from "../hooks/useDebounce.tsx";
import { LocationsList } from "./locationsList.tsx";
import { ChevronLeft, ChevronRight, MapPin, Search } from "lucide-react";
import { CacheData } from "../../../services/cache/cacheResponse.ts";
import type { GeocodingResults } from "../../../types/app-types.ts";
import useWeatherStore from "../../../store/weatherStore.ts";
import { useNavigate } from "react-router-dom";

export function SearchFeature({
  isSearchOpen = false,
}: {
  isSearchOpen?: boolean;
}) {
  /* === Setting states === */

  const [searchData, setSearchData] = useState("");

  const [searchOpen, setSearchOpen] = useState<boolean>(isSearchOpen);
  const [locationsList, setLocations] = useState<GeocodingResults | null>(null);

  const debouncedSearchData = useDebounce(searchData, 250);

  const getLocation = CacheData(getSearchLocation, 10000000);

  const locationsHistory = useWeatherStore((s) => s.locationsHistory);

  const navigate = useNavigate();

  /* === Setting states === */

  useEffect(() => {
    if (debouncedSearchData.length > 0) {
      const responses = getLocation(debouncedSearchData);
      responses.then((response) => {
        setLocations(response);
      });
    } else {
      setLocations(null);
    }
  }, [debouncedSearchData]);

  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  const historyRender = locationsHistory.map((location) => {
    return (
      <li key={location.id}>
        <button
          onClick={() => {
            setLocations(null);
            setSearchData("");
            navigate(
              `/forecast/${location.location.lat}/${location.location.lon}`,
            );
          }}
          className="item"
        >
          <MapPin strokeWidth={1.5} />
          <div className="location-container">
            <strong className="location-name">{location.city}</strong>
            <div className="location-info">
              {location.state} | {location.country}
            </div>
          </div>
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="search-container">
        {searchOpen && (
          <div className="search-section">
            <div className="input-container">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="close"
                aria-label="Close search container"
              >
                <ChevronLeft />
              </button>
              <input
                onChange={(e) => {
                  setSearchData(e.target.value);
                }}
                className="search-input"
                value={searchData}
              />
            </div>
            <strong>Results</strong>
            <div className="results">
              {locationsList && (
                <LocationsList
                  locationsList={locationsList}
                  setLocations={setLocations}
                  setSearchData={setSearchData}
                />
              )}
            </div>
            <div className="history-section">
              <span className="font-bold">History</span>
              <div className="search-history">{historyRender}</div>
            </div>
          </div>
        )}

        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="search-button"
          aria-label="Search"
        >
          <Search />
        </button>
      </div>
    </>
  );
}
