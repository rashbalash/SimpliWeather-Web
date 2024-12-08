import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    toggleUiFill,
    toggleThemeMode,
} from '../../../features/settings/settingsSlice';
import TemperatureScaleSelector from '../TemperatureScaleSelector/TemperatureScaleSelector';
import Switch from 'react-switch';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, closeModal }) => {
    const dispatch = useDispatch();
    const { isUiFilled, isDarkMode } = useSelector((state) => state.settings);

    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
      }, [isDarkMode]);

    if (!isOpen) return null;

    return (
        <div className="settings-modal" onClick={closeModal}>
            <div className="settings-modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Settings</h2>

                <div className="setting-modal-toggles">
                    <div className="settings-option">
                        <div className="settings-name-and-description">
                            <label className="toggle-label">
                                UI Fill
                            </label>
                            <p className="toggle-description">
                                Toggle between filled in vs bordered cards. 
                            </p>
                        </div>
                        <Switch
                            checked={isUiFilled}
                            onChange={() => dispatch(toggleUiFill())}
                            offColor="#C53335" // Keep in sync with --sw-main-accent-fill-color
                            onColor="#3ca146" // Keep in sync with --sw-secondary-accent-fill-color
                            width={60}
                            height={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                        />
                    </div>

                    <div className="settings-option">
                        <div className="settings-name-and-description">
                            <label className="toggle-label">
                                Dark Mode
                            </label>
                            <p className="toggle-description">
                                Toggle to switch between light and dark modes
                            </p>
                        </div>
                        <Switch
                            checked={isDarkMode}
                            onChange={() => dispatch(toggleThemeMode())}
                            offColor="#C53335" // Keep in sync with --sw-main-accent-fill-color
                            onColor="#3ca146" // Keep in sync with --sw-secondary-accent-fill-color
                            width={60}
                            height={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                        />
                    </div>

                    <div className="settings-option">
                        <div className="settings-name-and-description">
                            <label className="toggle-label">
                                Temperature Scale
                            </label>
                            <p className="toggle-description">
                                Toggle between Celsius and Fahrenheit
                            </p>
                        </div>
                        <TemperatureScaleSelector />
                    </div>
                </div>

                <button className="settings-close-button" onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default SettingsModal;
