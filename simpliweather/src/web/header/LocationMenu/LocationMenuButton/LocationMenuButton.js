import React from 'react';
import './LocationMenuButton.css';

const LocationMenuButton = ({ isOpen, toggleMenu }) => {
  return (
    <button
      className={`location-menu-button ${isOpen ? 'open' : ''}`}
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <span className="location-menu-button-icon close">×</span>
      ) : (
        <span className="location-menu-button-icon">=</span>
      )}
    </button>
  );
};

export default LocationMenuButton;