import { Droplets, Eye, Sun, Thermometer } from "lucide-react";

export const WeatherDetails = ({ todayWeather }: { todayWeather: any }) => {
  return (
    <section className="weather-today-container">
      <div className="weather-today">
        <div className="weather-today-header">
          <h2 className="forecast-section-title">Weather Details</h2>
        </div>
        <div className="weather-today-grid">
          <div className="info-card">
            <div className="card-header">
              <div className="card-data-name">FEELS LIKE</div>
              <div className="card-icon">
                <Thermometer />
              </div>
            </div>
            <div className="card-value">{todayWeather.feelsLike.value}</div>
            <div className="card-desc">
              {todayWeather.feelsLike.description}
            </div>
          </div>
          <div className="info-card">
            <div className="card-header">
              <div className="card-data-name">HUMIDITY</div>
              <div className="card-icon">
                <Droplets height={20} />
              </div>
            </div>
            <div className="card-value">{todayWeather.humidity.value}</div>
            <div className="card-desc">{todayWeather.humidity.description}</div>
          </div>
          <div className="info-card">
            <div className="card-header">
              <div className="card-data-name">UV INDEX</div>
              <div className="card-icon">
                <Sun />
              </div>
            </div>
            <div className="card-value">{todayWeather.uvIndex.value}</div>
            <div className="card-desc">{todayWeather.uvIndex.description}</div>
          </div>
          <div className="info-card">
            <div className="card-header">
              <div className="card-data-name">VISIBILITY</div>
              <div className="card-icon">
                <Eye />
              </div>
            </div>
            <div className="card-value">10 km</div>
            <div className="card-desc">Perfectly clear view</div>
          </div>
        </div>
      </div>
    </section>
  );
};
