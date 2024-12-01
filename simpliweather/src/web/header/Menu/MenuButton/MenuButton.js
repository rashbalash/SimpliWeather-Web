import React from 'react';
import './MenuButton.css';

const MenuButton = ({ isOpen, toggleMenu }) => {
  return (
    <button
      className={`menu-button ${isOpen ? 'open' : ''}`}
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <span className="menu-button-icon close">×</span>
      ) : (
        <span className="menu-button-icon">=</span>
      )}
    </button>
  );
};

export default MenuButton;