import React from 'react';
import { useSelector } from 'react-redux';
import WeatherAnimation from '../../../generalComponents/WeatherAnimations/WeatherAnimation';
import './hourlyWeatherCard.css';

const HOURLY_WEATHER_CARD_ANIMATED_ICON_SCALE = 55;

const HourlyWeatherCard = ({ hourlyWeatherData }) => {
  const isUiFilled = useSelector((state) => state.settings.isUiFilled);

  return (
    <div className="hourly-weather-card-wrapper">
      {hourlyWeatherData.map((hourData, index) => {
        return (
          <div key={index} className={`hourly-weather-card ${ isUiFilled ? 'filled' : 'unfilled' }`}>
            <p className="hourly-weather-hour">{hourData.time}</p>
            <div className="hourly-weather-icon">
              <WeatherAnimation weatherId={hourData.weatherAnimationId} scale={HOURLY_WEATHER_CARD_ANIMATED_ICON_SCALE} />
            </div>
            <p className="hourly-weather-condition">{hourData.condition}</p>
            <p className="hourly-weather-temp">{hourData.temperature}°</p>
          </div>
        );
      })}
    </div>
  );
};

export default HourlyWeatherCard;