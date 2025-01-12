import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setTemperatureUnit
} from '../../../features/settings/settingsSlice';
import { fetchWeatherDataForLocation } from '../../../../services/api/openWeatherMapsApiRequest';
import { addWeatherData } from '../../../features/weatherData/weatherDataSlice';
import './TemperatureScaleSelector.css'; // Add styles for the component

const TemperatureScaleSelector = () => {
    const dispatch = useDispatch();
    const { temperatureScale } = useSelector((state) => state.settings);
    const primaryId = useSelector((state) => state.settings.primaryId);
    const locations = useSelector((state) => state.locations.locations);

    const handleScaleChange = (scale) => {
        dispatch(setTemperatureUnit(scale));

        fetchWeatherDataForLocation(locations, primaryId, scale)
            .then((updatedWeatherData) => {
                dispatch(addWeatherData({ ...updatedWeatherData, id: primaryId }));
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
            });
    };

    return (
        <div className="temperature-scale-selector">
            <button
                className={`scale-button ${temperatureScale === 'imperial' ? 'active' : ''}`}
                onClick={() => handleScaleChange('imperial')}
            >
                °F
            </button>
            <button
                className={`scale-button ${temperatureScale === 'metric' ? 'active' : ''}`}
                onClick={() => handleScaleChange('metric')}
            >
                °C
            </button>
        </div>
    );
};

export default TemperatureScaleSelector;