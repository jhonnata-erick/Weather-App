// @ts-ignore
import "./App.css";
import { Current } from "../features/currentConditions/components/currentConditions.tsx";

function App() {
  return (
    <>
      <Current
        city="Uruguaiana"
        temp="19"
        clouds="100%"
        uvindex="low"
        humidity="87%"
      />
    </>
  );
}

export default App;
