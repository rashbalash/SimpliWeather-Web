import React, { useState } from 'react';
import './Header.css';

import LocationNameTag from './LocationNameTag/LocationNameTag';
import Menu from './Menu/Menu/Menu';
import MenuButton from './Menu/MenuButton/MenuButton';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <div>
            <div>
                <MenuButton isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                <Menu isOpen={isMenuOpen} />
            </div>

            <p className="title">SimpliWeather</p>
            <LocationNameTag location="annapolis, md" />
        </div>
    );
};

export default Header;