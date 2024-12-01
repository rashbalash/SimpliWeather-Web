import React from 'react';
import './locationNameTag.css'; // Import the CSS file for styling

const LocationNameTag = ({ location }) => {
  return <div className="location-name-tag">{location}</div>;
};

export default LocationNameTag;