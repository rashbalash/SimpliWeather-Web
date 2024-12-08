import React, { useState } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import Alert from '../../../generalComponents/Alert/Alert';

import './locationSearchModal.css';

const LocationSearchModal = ({ closeModal, searchLocation, useCurrentLocation, hasLocations }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);

    const handleSelect = async (address) => {
        try {
            setSearchQuery(address);
            const results = await geocodeByAddress(address);
            const { lat, lng } = await getLatLng(results[0]);
            searchLocation({ address, lat, lng });
        } catch (error) {
            console.error('Error selecting location:', error);
            setAlertMessage('Failed to select a valid location. Please try again.');
        }
    };

    const handleCloseAlert = () => {
        setAlertMessage(null);
    };

    const handleCloseModal = () => {
        if (hasLocations) {
            return;
        }
        closeModal();
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
                <PlacesAutocomplete
                    value={searchQuery}
                    onChange={setSearchQuery}
                    onSelect={handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div style={{ position: 'relative' }}>
                        <input
                            {...getInputProps({
                            placeholder: 'Search by city, address, or zipcode...',
                            })}
                        />
                        {(loading || suggestions.length > 0) && ( // Only show if loading or there are suggestions
                            <div className="autocomplete-dropdown">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                                return (
                                <div
                                    {...getSuggestionItemProps(suggestion, { className })}
                                    key={suggestion.placeId}
                                >
                                    {suggestion.description}
                                </div>
                                );
                            })}
                            </div>
                        )}
                        </div>
                    )}
                    </PlacesAutocomplete>
                    <button onClick={() => handleSelect(searchQuery)} className="search-button">
                        <span role="img" aria-label="search icon">
                            🔍
                        </span>
                    </button>
                </div>
                <div className="location-search-modal-current-location-wrapper">
                    <p>or, use your current location</p>
                    <button
                        className="current-location-button"
                        onClick={useCurrentLocation}
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
