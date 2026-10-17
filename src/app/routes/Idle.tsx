import { SearchFeature } from "../../features/search/components/SearchFeature.tsx";

export function SearchPage() {
  return (
    <main>
      <SearchFeature isSearchOpen={true} />
      <div>We coudn't find your location, search one.</div>
    </main>
  );
}
