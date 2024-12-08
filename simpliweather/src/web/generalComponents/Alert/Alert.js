import React, { useState } from 'react';
import './Alert.css';

const Alert = ({ severity, message, onClose }) => {
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    const handleClose = () => {
        setVisible(false);
        if (onClose) {
            onClose(); // Optional callback on close
        }
    };

    return (
        <div className={`alert alert-${severity}`}>
            <div className="alert-message">
                {message}
            </div>
            <button className="alert-close" onClick={handleClose}>
                ✖
            </button>
        </div>
    );
};

export default Alert;