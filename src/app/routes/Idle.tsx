import { SearchFeature } from "../../features/search/components/SearchFeature.tsx";

export function IdlePage() {
  return (
    <main>
      <SearchFeature isSearchOpen={true} />
      <div>We coudn't find your location, search one.</div>
    </main>
  );
}
