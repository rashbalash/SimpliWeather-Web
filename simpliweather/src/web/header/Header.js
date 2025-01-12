import React, { useState } from 'react';
import './Header.css';

import LocationNameTag from './LocationNameTag/LocationNameTag';
import LocationMenuModal from './LocationMenu/LocationMenuModal/LocationMenuModal';
import LocationMenuButton from './LocationMenu/LocationMenuButton/LocationMenuButton';
import AlertButton from './Alerts/AlertButton/AlertButton';
import SettingsButton from './Settings/SettingsButton/SettingsButton';

const Header = () => {
    const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const toggleLocationMenu = () => {
        setIsLocationMenuOpen((prev) => !prev);
    };

    const toggleSettings = () => {
        setIsSettingsOpen((prev) => !prev);
    }

    return (
        <div className="header-wrapper">
            <div className="menu-and-alert-buttons">
                <LocationMenuButton isOpen={isLocationMenuOpen} toggleLocationMenu={toggleLocationMenu} />
                <LocationMenuModal isOpen={isLocationMenuOpen} toggleLocationMenu={toggleLocationMenu} />

                <AlertButton />
            </div>
            <div className="header-title-and-location-name">
                <p className="title">SimpliWeather</p>
                <LocationNameTag location="annapolis, md" />
            </div>
            <div className="settings-and-profile">
                <SettingsButton isOpen={isSettingsOpen} toggleSettings={toggleSettings} />
            </div>
        </div>
    );
};

export default Header;