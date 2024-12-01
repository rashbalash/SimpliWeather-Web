import React from "react";
import PropTypes from "prop-types";
import "./WeatherMetricCard.css";

const WeatherMetricCard = ({ name, value, mask, icon }) => {
  return (
    <div className="weather-metric-card">
      <img src={icon} alt={`${name} icon`} className="weather-metric-icon" />
      <div className="weather-metric-value">
        {value}
        {mask}
      </div>
      <div className="weather-metric-name">{name}</div>
    </div>
  );
};

WeatherMetricCard.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  mask: PropTypes.string,
  icon: PropTypes.string.isRequired,
};

WeatherMetricCard.defaultProps = {
  mask: "",
};

export default WeatherMetricCard;