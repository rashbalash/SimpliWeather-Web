import './App.css';
import { HourlyWeatherCard, DailyWeatherCard, LocationNameTag, MinuteByMinuteCard } from './web/dashboard/components';

function App() {
  const mockData = Array.from({ length: 60 }, (v, i) => ({
    dt: 1661870400 + i * 60, // Increment timestamp by 60 seconds for each minute
    precipitation: parseFloat((Math.random() * 0.8).toFixed(2)), // Random precipitation between 0.0 and 0.8 mm
  }));

  return (
    <div className="App">
      <header className="main-header">
        <p>SimpliWeather</p>
        <LocationNameTag location="annapolis, md" />
        <break />
        <MinuteByMinuteCard minutelyData={mockData} />
        <break />
        <HourlyWeatherCard condition={"partly cloudy"} hour={"9 pm"} temperature={"52"} />
        <break />
        <DailyWeatherCard condition={"sunny"} dayOfWeek={"tue"} tempHigh={"50"} tempLow={"36"} />
      </header>
    </div>
  );
}

export default App;
