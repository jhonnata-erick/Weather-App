import { Link } from "react-router-dom";

export function ErrorPageLayout() {
  return (
    <main>
      <div>Errorrr</div>
      <Link to={"/"}>
        <button>Go back</button>
      </Link>
    </main>
  );
}
