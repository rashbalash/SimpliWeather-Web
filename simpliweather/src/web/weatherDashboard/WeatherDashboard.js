import React, { useState, useEffect, useCallback } from "react";
import './WeatherDashboard.css';
import { useDispatch, useSelector } from "react-redux";
import LocationSearchModal from '../weatherDashboard/locationComponents/locationSearchModal/locationSearchModal';
import { setIsLocationSearchModalOpen } from '../features/modals/locationSearchModalSlice';
import { CurrentWeatherCard, HourlyWeatherCard, DailyWeatherCard, MinuteByMinuteCard, WeatherMetricsPanel } from './weatherComponents';
import humidityIcon from "./weatherComponents/WeatherMetricsPanel/humidity.png"; // Example icon

const componentMapping = {
    0: 'CurrentWeather',
    1: 'HourlyWeather',
    2: 'DailyWeather'
}

const WeatherDashboard = () => {
    const dispatch = useDispatch();
    const locations = useSelector((state) => state.locations.locations);
    const isLocationSearchModalOpen = useSelector((state) => state.locationSearchModal.isLocationSearchModalOpen);
    const isLoading = useSelector((state) => state.weatherData.isLoading);
    const weatherDataByLocation = useSelector((state) => state.weatherData.weatherDataByLocation);
    const primaryId = useSelector((state) => state.settings.primaryId);
    const scale = useSelector((state) => state.settings.temperatureScale);

    const selectedLocationsWeatherData = weatherDataByLocation.find(
        (data) => data.id === primaryId
    )

    const convertToLocalTime = useCallback((timestamp) => {
        const localTime = new Date(timestamp * 1000);       
        const hours = localTime.getHours();
        const meridiem = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
      
        return `${formattedHours} ${meridiem}`;
    }, []);

    const getCompassDirection = useCallback((deg) => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
        const index = Math.round(deg / 45) % 8;
        return directions[index];
    }, []);

    const isDayTime = useCallback((weatherData, timeToCompare) => {
        let sunrise, sunset;

        if (!weatherData.sunrise || !weatherData.sunset) {
          sunrise = selectedLocationsWeatherData.current.sunrise;
          sunset = selectedLocationsWeatherData.current.sunset;
        } else {
            sunrise = weatherData.sunrise;
            sunset = weatherData.sunset;
        }

        return timeToCompare >= sunrise && timeToCompare <= sunset;
    }, [selectedLocationsWeatherData]);

    const [currentWeatherCardData, setCurrentWeatherCardData] = useState({
        temperature: 'N/A',
        high: 'N/A',
        low: 'N/A',
        realFeel: 'N/A',
        condition: 'partly cloudy',
        weatherAnimationId: 8001,
    });

    const checkIfDayOrNightAnimation = useCallback((id, weatherData, component) => {
        const dayAndNightAnimations = [800, 801, 802];
        
        let timeToCompare;

        if (component === 'CurrentWeather') {
            timeToCompare = Math.floor(Date.now() / 1000);
        } else {
            timeToCompare = weatherData.dt;
        }

        if (dayAndNightAnimations.includes(id)) {
            if (isDayTime(weatherData, timeToCompare)) {
                return parseInt(id.toString() + "1");
            } else {
                return parseInt(id.toString() + "2");
            }
        }
        return id;
    }, [isDayTime]);

    const [minutelyWeatherCardData, setMinutelyWeatherCardData] = useState([]);
    const [formattedHourlyData, setFormattedHourlyData] = useState([]);
    const [formattedDailyData, setFormattedDailyData] = useState([]);
    const [weatherMetricDetails, setWeatherMetricDetails] = useState([]);

    // Current weather effect
    useEffect(() => {
        if (!selectedLocationsWeatherData) return;
        
        setCurrentWeatherCardData({
            temperature: Math.trunc(selectedLocationsWeatherData.current.temp),
            high: Math.trunc(selectedLocationsWeatherData.daily[0].temp.max),
            low: Math.trunc(selectedLocationsWeatherData.daily[0].temp.min),
            realFeel: Math.trunc(selectedLocationsWeatherData.current.feels_like),
            condition: selectedLocationsWeatherData.current.weather[0].main,
            weatherAnimationId: checkIfDayOrNightAnimation(
                selectedLocationsWeatherData.current.weather[0].id,
                selectedLocationsWeatherData.current,
                componentMapping[0]
            )
        });
    }, [selectedLocationsWeatherData, checkIfDayOrNightAnimation, isLoading]);

    // Minutely data effect
    useEffect(() => {
        if (!selectedLocationsWeatherData) return;

        const processedMinutelyData = selectedLocationsWeatherData.minutely.map((entry) => ({
            dt: entry.dt, 
            precipitation: entry.precipitation, 
        }));
        setMinutelyWeatherCardData(processedMinutelyData);
    }, [selectedLocationsWeatherData, isLoading]);

    // Hourly data effect
    useEffect(() => {
        if (!selectedLocationsWeatherData) return;

        const timezoneOffset = selectedLocationsWeatherData.timezone_offset;

        const formattedHourlyWeatherData = selectedLocationsWeatherData.hourly
            .slice(1, 25)
            .map((hour) => {
                const weatherConditionId = checkIfDayOrNightAnimation(
                    hour.weather[0].id,
                    hour,
                    componentMapping[1]
                );

                return {
                    time: convertToLocalTime(hour.dt, timezoneOffset),
                    temperature: Math.trunc(hour.temp),
                    condition: hour.weather[0].main,
                    weatherAnimationId: weatherConditionId
                };
            });

        setFormattedHourlyData(formattedHourlyWeatherData);
    }, [selectedLocationsWeatherData, convertToLocalTime, checkIfDayOrNightAnimation]);

    // Daily data effect
    useEffect(() => {
        if (!selectedLocationsWeatherData) return;

        const timezoneOffset = selectedLocationsWeatherData.timezone_offset;
        const dailyWeatherData = selectedLocationsWeatherData.daily.map((day) => {
            const utcDate = new Date(day.dt * 1000);
            const localDate = new Date(utcDate.getTime() + timezoneOffset * 1000);
            
            const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const dayOfWeek = daysOfWeek[localDate.getUTCDay()];
            const weatherConditionId = checkIfDayOrNightAnimation(day.weather[0].id, day, componentMapping[2]);

            return {
                dayOfWeek,
                weatherAnimationId: weatherConditionId,
                condition: day.weather[0].main,
                highTemp: Math.trunc(day.temp.max),
                lowTemp: Math.trunc(day.temp.min),
            };
        });
        setFormattedDailyData(dailyWeatherData);
    }, [selectedLocationsWeatherData, isLoading, checkIfDayOrNightAnimation]);

    // Weather metrics effect
    useEffect(() => {
        if (!selectedLocationsWeatherData) return;

        const { humidity, pressure, uvi, wind_speed, wind_deg, sunrise, sunset } = selectedLocationsWeatherData.current;
        const windDirection = getCompassDirection(wind_deg);

        const selectedWeatherMetricDetails = [
            { name: "Humidity", value: humidity, mask: "%", icon: humidityIcon },
            { name: "Pressure", value: pressure, mask: " hPa", icon: humidityIcon },
            { name: "UV Index", value: uvi, mask: "", icon: humidityIcon },
            { name: "Wind", value: `${Math.trunc(wind_speed)}`, mask: scale === 'imperial' ? ` mph ${windDirection}` : ` kph ${windDirection}`, icon: humidityIcon },
            {
                name: "Sunrise",
                value: new Date(sunrise * 1000).toLocaleTimeString([], { hour: "numeric", minute: '2-digit' }),
                mask: "",
                icon: humidityIcon,
            },
            {
                name: "Sunset",
                value: new Date(sunset * 1000).toLocaleTimeString([], { hour: "numeric", minute: '2-digit' }),
                mask: "",
                icon: humidityIcon,
            },
        ];

        setWeatherMetricDetails(selectedWeatherMetricDetails);
    }, [selectedLocationsWeatherData, scale, getCompassDirection, isLoading]);

    useEffect(() => {
        if (!locations.length) {
            dispatch(setIsLocationSearchModalOpen(true));
        }
    }, [locations, dispatch]);

    return (
        <div className="weather-dashboard-wrapper">
            {isLocationSearchModalOpen && 
                <LocationSearchModal hasLocations={!locations.length} />
            }

            <div className="current-weather-and-details-wrapper">
                <CurrentWeatherCard currentWeatherCardData={currentWeatherCardData} />
                <div className="current-weather-spacer"></div>
                <WeatherMetricsPanel weatherMetrics={weatherMetricDetails} />
            </div>
            <div className="weather-dashboard-minute-hourly-daily">
                {minutelyWeatherCardData.some(entry => entry.precipitation > 0) && 
                    <MinuteByMinuteCard minutelyData={minutelyWeatherCardData} />
                }
                <HourlyWeatherCard hourlyWeatherData={formattedHourlyData} />
                <DailyWeatherCard dailyWeatherData={formattedDailyData} />
            </div>
        </div>
    );
};

export default WeatherDashboard;