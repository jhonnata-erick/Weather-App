import { useEffect, useState } from "react";
import { getSearchLocation } from "../api/getSearchLocation.ts";
import { useDebounce } from "../hooks/useDebounce.tsx";
import { LocationsList, type GeocodingResults } from "./locationsList.tsx";
import { Search } from "lucide-react";

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

  /* === Setting states === */

  useEffect(() => {
    if (debouncedSearchData.length > 0) {
      const responses = getSearchLocation(debouncedSearchData);
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
  return (
    <>
      <div className="search-container">
        {searchOpen && (
          <div className="search-section">
            <input
              onChange={(e) => {
                setSearchData(e.target.value);
              }}
              className="search-input"
              value={searchData}
            />
            {locationsList && (
              <div className="results">
                <LocationsList
                  locationsList={locationsList}
                  setLocations={setLocations}
                  setSearchData={setSearchData}
                />
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="search-button"
          aria-label="Search"
        >
          <Search color="#000000" />
        </button>
      </div>
    </>
  );
}
