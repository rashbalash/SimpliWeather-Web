import React, { useState } from 'react';
import './Header.css';

import LocationNameTag from './LocationNameTag/LocationNameTag';
import LocationMenuModal from './LocationMenu/LocationMenuModal/LocationMenuModal';
import LocationMenuButton from './LocationMenu/LocationMenuButton/LocationMenuButton';
import AlertButton from './Alerts/AlertButton/AlertButton';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <div className="header-wrapper">
            <div className="menu-and-alert-buttons">
                <LocationMenuButton isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <LocationMenuModal isOpen={isMenuOpen} />

                <AlertButton />
            </div>
            <div className="header-title-and-location-name">
                <p className="title">SimpliWeather</p>
                <LocationNameTag location="annapolis, md" />
            </div>
            <div className="settings-and-profile">
            </div>
        </div>
    );
};

export default Header;