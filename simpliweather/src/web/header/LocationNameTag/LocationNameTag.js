import React from 'react';
import { useSelector } from 'react-redux';

import './locationNameTag.css';

const LocationNameTag = ({ location }) => {
  const isUiFilled = useSelector((state) => state.settings.isUiFilled);

  return (
    <div className={`location-name-tag ${isUiFilled ? 'filled' : 'unfilled'}`}>{location}</div>
  );
};

export default LocationNameTag;