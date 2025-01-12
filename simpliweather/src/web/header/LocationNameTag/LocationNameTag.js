import React from 'react';
import { useSelector } from 'react-redux';

import './locationNameTag.css';

const LocationNameTag = ({ location }) => {
  const isUiFilled = useSelector((state) => state.settings.isUiFilled);
  const primaryId = useSelector((state) => state.settings.primaryId);

  const locationName = useSelector((state) => {
    const primaryLocation = state.locations.locations.find(
      (location) => location.id === primaryId
    );
    return primaryLocation ? primaryLocation.cityName : 'Hello, World!';
  });

  return (
    <div className={`location-name-tag ${isUiFilled ? 'filled' : 'unfilled'}`}>{locationName}</div>
  );
};

export default LocationNameTag;