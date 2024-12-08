import React from 'react';
import { useSelector } from 'react-redux';

import './DailyWeatherCard.css';

const DailyWeatherCard = ({ dayOfWeek, condition, tempHigh, tempLow }) => {
  const isUiFilled = useSelector((state) => state.settings.isUiFilled)

  return (
    <div className={`daily-weather-card ${ isUiFilled ? 'filled': 'unfilled' }`}>
      <p className="daily-weather-day">{dayOfWeek}</p>
      <div className="daily-weather-icon">
        {/* Replace the <div> below with an actual weather icon SVG or image */}
        <div className="icon sun-cloud">
          <span className="sun"></span>
        </div>
      </div>
      <p className="daily-weather-condition">{condition}</p>
      <div className="daily-weather-temp-wrapper">
        <p className="daily-weather-temp-high">{tempHigh}°</p>
        <span className="daily-weather-divider">|</span>
        <p className="daily-weather-temp-low">{tempLow}°</p>
      </div>
    </div>
  );
};

export default DailyWeatherCard;