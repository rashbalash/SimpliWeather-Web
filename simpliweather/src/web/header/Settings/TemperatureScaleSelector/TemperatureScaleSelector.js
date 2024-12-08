import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setTemperatureUnit
} from '../../../features/settings/settingsSlice';
import './TemperatureScaleSelector.css'; // Add styles for the component

const TemperatureScaleSelector = () => {
    const dispatch = useDispatch();
    const { temperatureScale } = useSelector((state) => state.settings);

    const handleScaleChange = (scale) => {
        dispatch(setTemperatureUnit(scale));
    };

    return (
        <div className="temperature-scale-selector">
            <button
                className={`scale-button ${temperatureScale === 'F' ? 'active' : ''}`}
                onClick={() => handleScaleChange('F')}
            >
                °F
            </button>
            <button
                className={`scale-button ${temperatureScale === 'C' ? 'active' : ''}`}
                onClick={() => handleScaleChange('C')}
            >
                °C
            </button>
        </div>
    );
};

export default TemperatureScaleSelector;
