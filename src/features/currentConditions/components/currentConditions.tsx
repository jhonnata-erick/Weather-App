import { CurrentConditions } from "./currentConditions/index.tsx";

interface CurrentConditionsProps {
  city: string;
  temp: string;
  clouds: string;
  uvindex: string;
  humidity: string;
}
export const Current = ({
  city,
  temp,
  clouds,
  uvindex,
  humidity,
}: CurrentConditionsProps) => {
  return (
    <CurrentConditions.Root>
      <CurrentConditions.Info city={city} temp={temp} />
      <CurrentConditions.InfoBox
        humidity={humidity}
        clouds={clouds}
        uvindex={uvindex}
      />
    </CurrentConditions.Root>
  );
};
