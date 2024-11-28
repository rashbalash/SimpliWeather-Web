import './App.css';
import HourlyWeatherCard from './web/dashboard/components/hourlyWeatherCard';
import DailyWeatherCard from './web/dashboard/components/dailyWeatherCard';

function App() {
  return (
    <div className="App">
      <header className="main-header">
        <p>SimpliWeather</p>
        <HourlyWeatherCard condition={"partly cloudy"} hour={"9 pm"} temperature={"52"} />
        <break />
        <DailyWeatherCard condition={"sunny"} dayOfWeek={"tue"} tempHigh={"50"} tempLow={"36"} />
      </header>
    </div>
  );
}

export default App;
