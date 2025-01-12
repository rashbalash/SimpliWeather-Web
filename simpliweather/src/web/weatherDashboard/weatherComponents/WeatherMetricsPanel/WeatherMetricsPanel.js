import React, { useState, useEffect } from "react";
import './WeatherMetricsPanel.css';

import WeatherMetricCard from "./WeatherMetricCard/WeatherMetricCard";

// This class should be responsible for generating, but the card itself could be a different component which takes in Value, Mask, Name, Icon
const WeatherMetricsPanel = ({ weatherMetrics }) => {
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

    // Decide whether to show only 3 items or all based on screen size and toggle state
    const visibleMetrics = isSmallScreen && !isExpanded ? weatherMetrics.slice(0, 3) : weatherMetrics;

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