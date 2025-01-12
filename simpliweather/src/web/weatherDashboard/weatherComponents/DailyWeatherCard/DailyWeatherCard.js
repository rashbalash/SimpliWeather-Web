import React from 'react';
import { useSelector } from 'react-redux';
import WeatherAnimation from '../../../generalComponents/WeatherAnimations/WeatherAnimation';
import './DailyWeatherCard.css';

const DAILY_WEATHER_CARD_ANIMATED_ICON_SCALE = 50;

const DailyWeatherCard = ({ dailyWeatherData }) => {
  const isUiFilled = useSelector((state) => state.settings.isUiFilled)

  return (
    <div className="daily-weather-card-wrapper">
        {dailyWeatherData.map((dayData, index) => {
          return (
            <div key={index} className={`daily-weather-card ${ isUiFilled ? 'filled': 'unfilled' }`}>
              <p className="daily-weather-day">{dayData.dayOfWeek}</p>
              <div className="daily-weather-icon">
                <WeatherAnimation weatherId={dayData.weatherAnimationId} scale={DAILY_WEATHER_CARD_ANIMATED_ICON_SCALE} />
              </div>
              <p className="daily-weather-condition">{dayData.condition}</p>
              <div className="daily-weather-temp-wrapper">
                <p className="daily-weather-temp-high">{dayData.highTemp}°</p>
                <span className="daily-weather-divider">|</span>
                <p className="daily-weather-temp-low">{dayData.lowTemp}°</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DailyWeatherCard;