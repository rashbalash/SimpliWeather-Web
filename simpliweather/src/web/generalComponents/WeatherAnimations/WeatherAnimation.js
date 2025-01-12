import React from 'react';
import Lottie from 'react-lottie';
import weatherAnimationMap from './WeatherAnimationMapping';

const WeatherAnimation = ({ weatherId, scale }) => {
    // Get the corresponding animation based on the weather ID, with a default animation (clear sky) if not found
    const animationData = weatherAnimationMap[weatherId] || 8001;

    const options = {
            loop: true,
            autoplay: true, 
            animationData: animationData,
            rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className="weather-animation">
            <Lottie options={options} height={scale} width={scale} />
        </div>
    );
};

export default WeatherAnimation;
