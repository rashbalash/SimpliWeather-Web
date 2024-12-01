import React from 'react';
import './Menu.css';

const Menu = ({ isOpen }) => {
  return (
    <div
      className={`menu-container ${isOpen ? 'menu-open' : ''}`}
      aria-expanded={isOpen}
    >
      {isOpen && (
        <div className="menu-content">
          <div className="menu-item">
            <div className="weather-card">
              <div className="weather-info">52°</div>
              <p>baltimore, md</p>
            </div>
          </div>
          <div className="menu-item">
            <div className="weather-card">
              <div className="weather-info">52°</div>
              <p>baltimore, md</p>
            </div>
          </div>
          <div className="menu-item">
            <div className="weather-card">
              <div className="weather-info">52°</div>
              <p>baltimore, md</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
