import React from 'react';
import './LocationMenuModal.css';

const LocationMenuModal = ({ isOpen }) => {
  return (
    <div
      className={`location-menu-container ${isOpen ? 'location-menu-open' : ''}`}
      aria-expanded={isOpen}
    >
      {isOpen && (
        <div className="location-menu-content">
          <div className="location-menu-item">
            <div className="location-menu-weather-card">
              <div className="location-menu-weather-info">52°</div>
              <p>baltimore, md</p>
            </div>
          </div>
          <div className="location-menu-item">
            <div className="location-menu-weather-card">
              <div className="location-menu-weather-info">52°</div>
              <p>baltimore, md</p>
            </div>
          </div>
          <div className="location-menu-item">
            <div className="location-menu-weather-card">
              <div className="location-menu-weather-info">52°</div>
              <p>baltimore, md</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationMenuModal;
