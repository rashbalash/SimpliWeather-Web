import React from 'react';
import { useSelector } from 'react-redux';
import WeatherAnimation from '../../../generalComponents/WeatherAnimations/WeatherAnimation';
import './CurrentWeatherCard.css';

const CURRENT_WEATHER_CARD_ANIMATED_ICON_SCALE = 140;

const CurrentWeatherCard = ({ currentWeatherCardData }) => {
  const isUiFilled = useSelector((state) => state.settings.isUiFilled);
  const { temperature, high, low, realFeel, condition, weatherAnimationId } = currentWeatherCardData;

  return (
    <div className="current-weather-card">
      <div className="current-weather-icon">
        <WeatherAnimation weatherId={weatherAnimationId} scale={CURRENT_WEATHER_CARD_ANIMATED_ICON_SCALE} />
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
