import React, { useState } from 'react';
import Alert from '../../../generalComponents/Alert/Alert';
import { useDispatch, useSelector } from "react-redux";
import { addLocation, removeLocation } from '../../../features/locations/locationsSlice';
import { setPrimaryId } from '../../../features/settings/settingsSlice';
import { setIsLocationSearchModalOpen } from '../../../features/modals/locationSearchModalSlice';
import LocationSearchAutocomplete from '../locationSearchAutocomplete/locationSearchAutocomplete';
import { fetchWeatherData } from '../../../../services/api/openWeatherMapsApiRequest';
import { addWeatherData, setIsLoadingStatus } from '../../../features/weatherData/weatherDataSlice';
import { v4 as uuidv4 } from 'uuid'; // Using UUID for random and unique IDs

import './locationSearchModal.css';

// API USED HERE: https://nominatim.org/release-docs/develop/api/Reverse/
const LocationSearchModal = ({ hasLocations }) => {
    const dispatch = useDispatch();
    const [alertMessage, setAlertMessage] = useState(null);
    const scale = useSelector((state) => state.settings.temperatureScale);
    
    // We generate a random key to tie the locations list and weatherData list together.
    const uuid = uuidv4();

    const handleUseCurrentLocation = () => {
        dispatch(setIsLoadingStatus(true));

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                const cityName = await reverseGeocode(latitude, longitude);
                dispatch(addLocation({ cityName, lat: latitude, lon: longitude, isCurrentLocation: true, id: uuid }));

                let weatherData = null;
                try {
                    weatherData = await fetchWeatherData(latitude, longitude, scale);
                } catch {
                    dispatch(removeLocation(uuid))
                    setAlertMessage("Failed to fetch weather data. Please try again.");
                }
               
                const indexedWeatherData = { ...weatherData, id: uuid};
                dispatch(addWeatherData(indexedWeatherData));
                setAlertMessage(null); 
                dispatch(setIsLocationSearchModalOpen(false)); 
                dispatch(setPrimaryId(uuid));
                dispatch(setIsLoadingStatus(false));
            },
            (error) => {
                setAlertMessage('Failed to retrieve your location. Please try again.');
                dispatch(setIsLoadingStatus(false));
            }
        );
    };

    const reverseGeocode = async (lat, lon) => {
        try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${lat}&lon=${lon}`;
            const response = await fetch(url);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
    
            // Check if the response contains valid features
            if (!data || !data.features || data.features.length === 0) {
                throw new Error("No address found for the given coordinates.");
            }
    
            // Extract properties from the first feature
            const properties = data.features[0]?.properties;
    
            if (!properties || !properties.address) {
                throw new Error("Address details not available in the response.");
            }
    
            // Extract city or fallback to "Unknown Location"
            const address = properties.address;
            const city = 
                address.city || 
                address.town || 
                address.county || 
                address.village || 
                "Unknown Location";
    
            return city;
        } catch (error) {
            throw new Error(`Failed to reverse geocode: ${error.message}`);
        }
    };
    

    const handleCloseAlert = () => {
        setAlertMessage(null);
    };

    const handleCloseModal = () => {
        if (hasLocations) {
            return;
        }
        dispatch(setIsLocationSearchModalOpen(false));
    }
    
    return (
        <div className="location-search-modal-overlay" onClick={handleCloseModal}>
            {alertMessage && (
                <Alert
                    severity="red"
                    message={alertMessage}
                    onClose={handleCloseAlert}
                />
            )}
            <div
                className="location-search-modal"
                onClick={(e) => e.stopPropagation()} // Prevents click inside modal from closing it
            >
                <div className="location-search-modal-title">
                    <h1>Welcome to SimpliWeather</h1>
                    <p>a simple, but powerful, weather app that provides all of the need-to-know information for your day</p>
                </div>
                <div className="location-search-wrapper">
                    <LocationSearchAutocomplete setAlertMessage={setAlertMessage} reverseGeocode={reverseGeocode} />                    
                </div>
                <div className="location-search-modal-current-location-wrapper">
                    <p>or, use your current location</p>
                    <button
                        className="current-location-button"
                        onClick={handleUseCurrentLocation}
                    >
                        <span role="img" aria-label="location pin">
                            📍
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LocationSearchModal;
