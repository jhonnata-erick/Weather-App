import { MetricItem } from "../../../../components/ui/metric-item.tsx";
interface CurrentConditionsInfoBoxProps {
  humidity: string;
  clouds: string;
  uvindex: string;
}
export const CurrentConditionsInfoBox = ({
  humidity,
  clouds,
  uvindex,
}: CurrentConditionsInfoBoxProps) => {
  return (
    <div className="metrics-card">
      <MetricItem value={humidity} label={"Humidity"} />
      <MetricItem value={clouds} label={"Clouds"} />
      <MetricItem value={uvindex} label={"UVIndex"} />
    </div>
  );
};
