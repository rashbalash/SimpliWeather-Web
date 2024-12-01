import React from "react";
import './WeatherDashboard.css'

import { CurrentWeatherCard,
    HourlyWeatherCard, 
    DailyWeatherCard, 
    MinuteByMinuteCard,
    WeatherMetricsPanel } from './weatherComponents';

const WeatherDashboard = () => {
    const mockData = Array.from({ length: 60 }, (v, i) => ({
        dt: 1661870400 + i * 60, // Increment timestamp by 60 seconds for each minute
        precipitation: parseFloat((Math.random() * 0.8).toFixed(2)), // Random precipitation between 0.0 and 0.8 mm
    }));
    
    const mockWeatherData = {
        temperature: 52,
        high: 55,
        low: 25,
        realFeel: 49,
        condition: 'partly cloudy',
    };

    return (
        <div className="weather-dashboard-wrapper">
            <div className="current-weather-and-details-wrapper">
                <CurrentWeatherCard
                    temperature={mockWeatherData.temperature}
                    high={mockWeatherData.high}
                    low={mockWeatherData.low}
                    realFeel={mockWeatherData.realFeel}
                    condition={mockWeatherData.condition}
                />
                <div className="current-weather-spacer"></div>
                <WeatherMetricsPanel />
            </div>
            <div className="weather-dashboard-minute-hourly-daily">
                <MinuteByMinuteCard minutelyData={mockData} />
                <break />
                <HourlyWeatherCard condition={"partly cloudy"} hour={"9 pm"} temperature={"52"} />
                <break />
                <DailyWeatherCard condition={"sunny"} dayOfWeek={"tue"} tempHigh={"50"} tempLow={"36"} />
            </div>
        </div>
    )
}

export default WeatherDashboard