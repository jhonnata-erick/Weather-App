import { useNavigate } from "react-router-dom";

export function StartLayout() {
  const navigate = useNavigate();
  return (
    <main>
      <h1>Simple Weather App</h1>
      <p>See weather forecast for the next hours, or the next days</p>
      <button
        onClick={() => {
          navigate("/permission");
        }}
      >
        Get Started
      </button>
    </main>
  );
}
