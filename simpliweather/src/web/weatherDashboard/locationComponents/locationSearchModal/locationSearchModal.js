import React, { useState } from 'react';
import './locationSearchModal.css';

const LocationSearchModal = ({ closeModal, searchLocation, useCurrentLocation }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (searchQuery.trim()) {
            searchLocation(searchQuery);
        }
    };

    return (
        <div className="location-search-modal-overlay" onClick={closeModal}>
            <div
                className="location-search-modal"
                onClick={(e) => e.stopPropagation()} // Prevents click inside modal from closing it
            >
                <div className="location-search-modal-title">
                    <h1>Welcome to SimpliWeather</h1>
                    <p>
                        a simple, but powerful, weather app that provides all of the
                        need-to-know information for your day
                    </p>
                </div>
                <div className="location-search-wrapper">
                    <input
                        type="text"
                        placeholder="search by city or zipcode"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={handleSearch} className="search-button">
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
