interface CurrentConditionsInfoProps {
  city: string;
  temp: string;
}
export const CurrentConditionsInfo = ({
  city,
  temp,
}: CurrentConditionsInfoProps) => {
  return (
    <div className="weather-header">
      <div className="top-row">
        <div className="location">{city}</div>
        <div className="status-tag">It's Sunny</div>
      </div>
      <div className="temperature-wrapper">
        <span className="temperature">{temp}</span>
        <span className="degree-symbol">°</span>
      </div>
    </div>
  );
};
