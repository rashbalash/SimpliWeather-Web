import React from "react";
import { useSelector } from "react-redux";

import "./WeatherMetricCard.css";

const WeatherMetricCard = ({ name, value, mask, icon }) => {
    const isUiFilled = useSelector((state) => state.settings.isUiFilled);

    return (
        <div className={`weather-metric-card ${isUiFilled ? 'filled' : 'unfilled'}`}>
            <img src={icon} alt={`${name} icon`} className="weather-metric-icon" />
                <div className="weather-metric-value">
                    {value}
                    {mask}
                </div>
            <div className="weather-metric-name">{name}</div>
        </div>
    );
};

export default WeatherMetricCard;