import React, { useState, useEffect } from "react";
import './WeatherMetricsPanel.css';

import WeatherMetricCard from "./WeatherMetricCard/WeatherMetricCard";
import humidityIcon from "./humidity.png"; // Example icon

// This class should be responsible for generating, but the card itself could be a different component which takes in Value, Mask, Name, Icon
const WeatherMetricsPanel = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    const toggleGrid = () => {
        setIsExpanded(!isExpanded);
      };

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Humidity, Pressure,  Air Quality, UV Index, Wind, Sunrise + Sunset, Precipitation Info, Visibility
    const metrics = [
        { name: "humidity", value: 50, mask: "%", icon: humidityIcon },
        { name: "pressure", value: 1013, mask: " hPa", icon: humidityIcon },
        { name: "UV Index", value: 5, mask: "", icon: humidityIcon },
        { name: "Wind", value: 12, mask: " km/h", icon: humidityIcon },
        { name: "Sunrise", value: "6:30", mask: " AM", icon: humidityIcon },
        { name: "Sunset", value: "7:45", mask: " PM", icon: humidityIcon },
    ];

    // Decide whether to show only 3 items or all based on screen size and toggle state
    const visibleMetrics = isSmallScreen && !isExpanded ? metrics.slice(0, 3) : metrics;

    return (

        <div className="weather-metrics-panel-wrapper">
            <div
                className={`weather-metrics-grid-container ${
                    isSmallScreen && !isExpanded ? "collapsed" : "expanded"
                }`}
            >
                {visibleMetrics.map((metric, index) => (
                    <WeatherMetricCard
                        key={index}
                        name={metric.name}
                        value={metric.value}
                        mask={metric.mask}
                        icon={metric.icon}
                    />
                ))}
            </div>
            {isSmallScreen && (
                <button
                    className="weather-metrics-toggle-button"
                    onClick={toggleGrid}
                >
                    {isExpanded ? "^ Less" : "> More"}
                </button>
            )}
        </div>
    );
};

export default WeatherMetricsPanel;