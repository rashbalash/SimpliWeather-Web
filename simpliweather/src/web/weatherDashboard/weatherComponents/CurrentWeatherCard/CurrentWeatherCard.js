import React from 'react';
import { useSelector } from 'react-redux';

import './CurrentWeatherCard.css';

const CurrentWeatherCard = ({ temperature, high, low, realFeel, condition }) => {
  const isUiFilled = useSelector((state) => state.settings.isUiFilled);

  return (
    <div className="current-weather-card">
      <div className="current-weather-icon">
        <div className="sun"></div>
        <div className="cloud"></div>
      </div>
      <div className={`current-weather-details ${isUiFilled ? 'filled' : 'unfilled'}`}>
        <div className="current-weather-temp-box">
          <span className="current-weather-temp">{temperature}°</span>
          <div className="current-weather-high-low">
            <span className="current-weather-high-temp">{high}°</span>
            <span className="current-weather-low-temp">{low}°</span>
          </div>
        </div>
        <div className="current-weather-real-feel">real feel: {realFeel}°</div>
        <div className="current-weather-condition">{condition}</div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
