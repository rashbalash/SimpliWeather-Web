import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocation, removeLocation } from "../../../features/locations/locationsSlice";
import { setIsLocationSearchModalOpen }from '../../../features/modals/locationSearchModalSlice';
import { fetchWeatherData } from '../../../../services/api/openWeatherMapsApiRequest';
import { addWeatherData } from '../../../features/weatherData/weatherDataSlice';
import { v4 as uuidv4 } from 'uuid'; // Using UUID for random and unique IDs
import { setPrimaryId } from '../../../features/settings/settingsSlice';

import './locationSearchAutocomplete.css';

// https://docs.mapbox.com/api/overview/
const LocationSearchAutocomplete = ({ setAlertMessage, reverseGeocode }) => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const uuid = uuidv4();
    const scale = useSelector((state) => state.settings.temperatureScale);

    // Function to fetch suggestions from the Mapbox API
    const fetchSuggestions = async (query) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        try {
            // Mapbox Geocoding API URL with autocomplete enabled
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=pk.eyJ1Ijoic2ltcGxpd2VhdGhlcndlYiIsImEiOiJjbTRnMndmcnYxZWcwMm1wc3k5bTU0NXIyIn0.Fhs0qozp55Yt01dbgqbAcA`
            );
            const data = await response.json();
            setSuggestions(data.features || []);
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    };

    // Handle input change to search for suggestions
    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        fetchSuggestions(query);
    };

    const handleSearchLocation = async (query) => {
        try {
            const response = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=pk.eyJ1Ijoic2ltcGxpd2VhdGhlcndlYiIsImEiOiJjbTRnMndmcnYxZWcwMm1wc3k5bTU0NXIyIn0.Fhs0qozp55Yt01dbgqbAcA`
            );
            const data = await response.json();
            const location = data.features[0];

            if (location) {
                const { center } = location;
                const [lon, lat] = center;
                const cityName = await reverseGeocode(lat, lon);

                // Dispatch the selected location
                dispatch(addLocation({ cityName, lat, lon, isCurrentLocation: false, id: uuid }));

                let weatherData = null;
                try {
                    weatherData = await fetchWeatherData(lat, lon, scale);
                } catch {
                    dispatch(removeLocation(uuid))
                    setAlertMessage("Failed to fetch weather data. Please try again.");
                }
               
                const indexedWeatherData = { ...weatherData, id: uuid};
                dispatch(addWeatherData(indexedWeatherData));

                // Reset suggestions and input
                setSuggestions([]);
                setSearchQuery('');
                dispatch(setIsLocationSearchModalOpen(false));
                dispatch(setPrimaryId(uuid));
            } else {
                setAlertMessage("No location found. Please try a different search.");
            }
        } catch (error) {
            setAlertMessage("Failed to retrieve location. Please try again.");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by city, address, or zipcode..."
                value={searchQuery}
                onChange={handleInputChange}
                className="location-search-wrapper-input"
            />
            {suggestions.length > 0 && (
                <div className="autocomplete-dropdown">
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion.id}
                            className="suggestion-item"
                            onClick={() => handleSearchLocation(`${suggestion.text}, ${suggestion.context ? suggestion.context[0].text : ''}`)}
                        >
                            {suggestion.text}, {suggestion.context ? suggestion.context[0].text : ''}
                        </div>
                    ))}
                </div>
            )}
            <button onClick={() => handleSearchLocation(searchQuery)} className="search-button">
                <span role="img" aria-label="search icon">
                    🔍
                </span>
            </button>
        </div>
    );
};

export default LocationSearchAutocomplete;