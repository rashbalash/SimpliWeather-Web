import React, { useState } from 'react';
import './AlertButton.css';
import AlertModal from '../AlertModal/AlertModal';

import notificationSymbol from "./notificationSymbol.png"; // Example icon

const AlertButton = () => {
    const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    // Use mockAlerts data instead of fetching from API
    const alerts = [
        {
            event: "Severe Thunderstorm Warning",
            description: "A severe thunderstorm is expected with strong winds and hail.",
            severity: "Severe",
            start: 1635705600,
            end: 1635709200,
        },
        {
            event: "Flash Flood Watch",
            description: "Heavy rains expected, flash flooding possible in low-lying areas.",
            severity: "Moderate",
            start: 1635712800,
            end: 1635716400,
        },
    ];
    
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
