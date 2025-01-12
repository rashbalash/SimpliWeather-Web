import React, { useState } from 'react';
import { useSelector } from "react-redux";
import './AlertButton.css';
import AlertModal from '../AlertModal/AlertModal';
import notificationSymbol from "./notificationSymbol.png"; // Example icon

const AlertButton = () => {
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const primaryId = useSelector((state) => state.settings.primaryId); // Current location ID
    const weatherDataByLocation = useSelector((state) => state.weatherData.weatherDataByLocation);

    // Find the alerts for the selected location
    const selectedWeatherData = weatherDataByLocation.find(
        (weatherData) => weatherData.id === primaryId
    );
    const alerts = (selectedWeatherData?.alerts || []).filter(
        (alert) => alert.event !== "Test Message"
    );

    const getAlertSummary = (alert) => {
        return alert.description.slice(0, 50) + (alert.description.length > 50 ? '...' : ''); // Limit to 50 characters
    };

    const toggleTooltip = (state) => {
        setShowTooltip(state);
    };

    return (
        <div className='alert-button-wrapper'>
            <button
                className={`alert-button ${alerts.length > 0 ? 'alert-active' : ''}`}
                onClick={() => setIsAlertModalOpen(true)}
                onMouseEnter={() => toggleTooltip(true)}
                onMouseLeave={() => toggleTooltip(false)}
            >
                      <img src={notificationSymbol} alt={"notification symbol"} className="notification-symbol" />
            </button>

            {showTooltip && alerts.length > 0 && (
                <div className="tooltip">
                    {getAlertSummary(alerts[0])} - Click/Tap to learn more
                </div>
            )}
            
            {isAlertModalOpen && (<AlertModal 
                alerts={alerts} 
                isOpen={isAlertModalOpen}
                closeModal={() => setIsAlertModalOpen(false)} 
            />)}
        </div>
    );
};

export default AlertButton;
