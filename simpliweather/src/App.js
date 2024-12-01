import React from 'react';
import './App.css';

import Header from './web/header/Header';
import WeatherDashboard from './web/weatherDashboard/WeatherDashboard';

function App() {
  

  return (
    <div className="App">
      {/* Header */}
      <Header />

      {/* Spacer */}
      <div className="spacer"></div>

      {/* Weather Dashboard */}
      <WeatherDashboard />

      {/* Radar */}

      {/* Spacer */}
      <div className="spacer"></div>

      {/* Footer */}
    </div>
  );
}

export default App;
