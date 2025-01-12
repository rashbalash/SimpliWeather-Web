import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LocationMenuItem from './LocationMenuItem/LocationMenuItem';
import { setPrimaryId } from '../../../features/settings/settingsSlice';
import { setIsLocationSearchModalOpen } from '../../../features/modals/locationSearchModalSlice';
import './LocationMenuModal.css';

const LocationMenuModal = ({ isOpen, toggleLocationMenu }) => {
  const dispatch = useDispatch();
  const locations = useSelector((state) => state.locations.locations);
  const weatherDataByLocation = useSelector((state) => state.weatherData.weatherDataByLocation);

  const handlePlusButtonClick = () => {
    dispatch(setIsLocationSearchModalOpen(true));
  };

  const handleLocationSelect = (id) => {
    dispatch(setPrimaryId(id)); // Update primaryId in Redux
    toggleLocationMenu();
  };

  const locationWeatherData = locations.map((location) => {
    const weatherData = weatherDataByLocation.find(
      (data) => data.id === location.id
    ); // Match by id
    return {
      ...location,
      temperature: Math.trunc(weatherData?.current?.temp) || "--", // Use temperature or default to "--"
    };
  });

  return (
    <div
      className={`location-menu-container ${isOpen ? 'location-menu-open' : ''}`}
      aria-expanded={isOpen}
    >
      {isOpen && (
        <div className="location-menu-content">
          <button
            className="location-menu-plus-button"
            onClick={handlePlusButtonClick}
            aria-label="Add new location"
          >
            +
          </button>
          {locationWeatherData.map((location, index) => (
            <LocationMenuItem
              key={index}
              id={location.id}
              cityName={location.cityName}
              temperature={location.temperature || "--"}
              onClick={() => handleLocationSelect(location.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationMenuModal;