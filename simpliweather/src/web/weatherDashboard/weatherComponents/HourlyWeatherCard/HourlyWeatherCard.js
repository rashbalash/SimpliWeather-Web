import React from 'react';
import './hourlyWeatherCard.css';

const HourlyWeatherCard = ({ hour, condition, temperature }) => {
  return (
    <div className="hourly-weather-card">
      <p className="hourly-weather-hour">{hour}</p>
      <div className="hourly-weather-icon">
        {/* Replace the <div> below with an actual weather icon SVG or image */}
        <div className="icon sun-cloud">
          <span className="sun"></span>
        </div>
      </div>
      <p className="hourly-weather-condition">{condition}</p>
      <p className="hourly-weather-temp">{temperature}°</p>
    </div>
  );
};

export default HourlyWeatherCard;