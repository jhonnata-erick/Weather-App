import "./metric-item.css";
export const MetricItem = ({
  value,
  label,
}: {
  value: string;
  label: string;
}) => {
  return (
    <div className="metric-item">
      <span className="value">{value}</span>
      <span className="label">{label}</span>
    </div>
  );
};
