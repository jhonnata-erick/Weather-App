import { ClipLoader } from "react-spinners";

export function LoadingPage() {
  return (
    <main className="loading-container" aria-live="polite" aria-label="Loading">
      <ClipLoader color="#3b82f6" size={60} speedMultiplier={1} />
    </main>
  );
}
