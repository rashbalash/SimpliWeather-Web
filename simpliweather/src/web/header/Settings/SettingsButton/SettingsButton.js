import React, { useState } from 'react';
import './SettingsButton.css';
import settingsIcon from './settings.png';
import SettingsModal from '../SettingsModal/SettingsModal';

const SettingsButton = () => {
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    return (
        <div>
            <button 
                className="settings-button"
                onClick={() => setIsSettingsModalOpen(true)}
            >
                <img src={settingsIcon} alt="settings icon" className="settings-button-icon" />
            </button>
            <SettingsModal
                isOpen={isSettingsModalOpen}
                closeModal={() => setIsSettingsModalOpen(false)}
            />
        </div>
    );
};

export default SettingsButton;