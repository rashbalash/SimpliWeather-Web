import './App.css';
import HourlyWeatherCard from './web/dashboard/components/hourlyWeatherCard';

function App() {
  return (
    <div className="App">
      <header className="main-header">
        <p>SimpliWeather</p>
        <HourlyWeatherCard condition={"partly cloudy"} hour={"9 pm"} temperature={"52"} />
      </header>
    </div>
  );
}

export default App;
