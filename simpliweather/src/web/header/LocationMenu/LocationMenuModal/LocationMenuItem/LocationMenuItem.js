import React from "react";
import { useSelector, useDispatch } from "react-redux"; // To dispatch the action
import { removeWeatherDataById } from "../../../../features/weatherData/weatherDataSlice";
import { removeLocation } from "../../../../features/locations/locationsSlice";
import { setPrimaryId } from "../../../../features/settings/settingsSlice";
import "./LocationMenuItem.css";

const LocationMenuItem = ({ id, cityName, temperature, onClick }) => {
    const dispatch = useDispatch();
    const primaryId = useSelector((state) => state.settings.primaryId); 
    const locations = useSelector((state) => state.locations.locations); 

    const handleDelete = (event) => {
        event.stopPropagation(); // Prevent triggering the onClick handler

        if (id === primaryId) {
            // Get the next available location (excluding the one being deleted)
            const remainingLocations = locations.filter((location) => location.id !== id);

            if (remainingLocations.length > 0) {
                const nextPrimaryId = remainingLocations[0].id;
                dispatch(setPrimaryId(nextPrimaryId));
            } else {
                dispatch(setPrimaryId(null));
            }
        }

        dispatch(removeWeatherDataById(id)); // Dispatch delete action
        dispatch(removeLocation(id));
    };

    return (
        <div className="location-menu-item" onClick={onClick}>
            <div className="location-menu-weather-card">
                <div className="location-menu-weather-info">{temperature}°</div>
                <p>{cityName}</p>
            </div>
            <button
                className="location-menu-delete-button"
                onClick={handleDelete}
                aria-label={`Delete ${cityName}`}
            >
                🗑️
            </button>
        </div>
    );
};

export default LocationMenuItem;