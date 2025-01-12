import React from 'react';
import './AlertModal.css';

const AlertModal = ({ alerts, isOpen, closeModal }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains("alert-modal")) {
            closeModal();
        }
    };

    return (
        <div className="alert-modal" onClick={handleOverlayClick}>
            <div className="alert-modal-content">
                <h2>Weather Alerts</h2>
                {alerts.length === 0 ? (
                    <>
                        <p>No alerts in your area at the moment.</p>
                    </>
                ) : (
                    alerts.map((alert, index) => (
                        <div key={index} className="alert-item">
                            <h3>{alert.event}</h3>
                            <p>{alert.description}</p>
                            <p>
                                <strong>Starts: </strong>
                                {new Date(alert.start * 1000).toLocaleString()}
                            </p>
                            <p>
                                <strong>Expires: </strong>
                                {new Date(alert.end * 1000).toLocaleString()}
                            </p>
                            <hr />
                        </div>
                    ))
                )}
                <button onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default AlertModal;
