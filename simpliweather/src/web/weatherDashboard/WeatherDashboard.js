import React, { useState } from "react";
import './WeatherDashboard.css'

import { useSelector, useDispatch } from "react-redux";
import {
    addLocation
} from '../features/locations/locationsSlice';

import LocationSearchModal from '../weatherDashboard/locationComponents/locationSearchModal/locationSearchModal';
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

    const dispatch = useDispatch();
    const locations = useSelector((state) => state.locations.locations);
    const [isLocationSearchModalOpen, setIsLocationSearchModalOpen] = useState(!locations.length);

    const handleSearchLocation = (query) => {
        dispatch(addLocation(query));
        setIsLocationSearchModalOpen(false); // Close modal after search
    };

    const handleUseCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Latitude:', position.coords.latitude);
                console.log('Longitude:', position.coords.longitude);
                setIsLocationSearchModalOpen(false); // Close modal after using location
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        );
    };

    return (
        <div className="weather-dashboard-wrapper">
            {isLocationSearchModalOpen && 
                <LocationSearchModal
                    closeModal={() => setIsLocationSearchModalOpen(false)}
                    searchLocation={handleSearchLocation}
                    useCurrentLocation={handleUseCurrentLocation}
                />
            }

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
                <HourlyWeatherCard condition={"partly cloudy"} hour={"9 pm"} temperature={"52"} />
                <DailyWeatherCard condition={"sunny"} dayOfWeek={"tue"} tempHigh={"50"} tempLow={"36"} />
            </div>
        </div>
    )
}

export default WeatherDashboard