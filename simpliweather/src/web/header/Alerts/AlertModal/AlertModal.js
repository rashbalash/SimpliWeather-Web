import React from 'react';
import './AlertModal.css';

const AlertModal = ({ alerts, isOpen, closeModal }) => {
    if (!isOpen) return null;

    if (alerts.length === 0) {
        return (
            <div className="alert-modal">
                <div className="alert-modal-content">
                    <h2>No Alerts</h2>
                    <p>There are no weather alerts in your area at the moment.</p>
                    <button onClick={closeModal}>Close</button>
                </div>
            </div>
        );
    }

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("alert-modal")) {
            closeModal();
        }
    };

    return (
        <div className="alert-modal" onClick={handleOverlayClick}>
            <div className="alert-modal-content">
                <h2>{alerts[0].event}</h2>
                <p>{alerts[0].description}</p>
                <p><strong>Severity: </strong>{alerts[0].severity}</p>
                <p><strong>Expires: </strong>{new Date(alerts[0].end * 1000).toLocaleString()}</p> {/* Convert Unix timestamp */}
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default AlertModal;
