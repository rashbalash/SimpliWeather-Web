import { configureStore } from '@reduxjs/toolkit';
import { saveStateToLocalStorage, loadStateFromLocalStorage } from '../services/localStorage/localStorage';
import { fetchWeatherDataForLocation } from '../services/api/openWeatherMapsApiRequest';
import { addWeatherData } from '../web/features/weatherData/weatherDataSlice';

import settingsSlice from "../web/features/settings/settingsSlice";
import locationsSlice from "../web/features/locations/locationsSlice";
import locationSearchModalSlice from '../web/features/modals/locationSearchModalSlice';
import weatherDataSlice from '../web/features/weatherData/weatherDataSlice';

const MAX_CACHE_AGE = 10 * 60 * 1000; // 10 minutes in milliseconds

// Load persisted state from localStorage
const persistedState = loadStateFromLocalStorage();

const store = configureStore({
    reducer: {
        settings: settingsSlice,
        locations: locationsSlice,
        locationSearchModal: locationSearchModalSlice,
        weatherData: weatherDataSlice,
    },
    preloadedState: persistedState,
});

// Function to check and update stale weather data
const loadAndUpdateWeatherData = async () => {
    const state = store.getState();
    const weatherData = state.weatherData.weatherDataByLocation;
    const locations = state.locations.locations;
    const scale = state.settings.temperatureScale;

    if (weatherData == null || locations == null) {
      return;
    } 

    const now = Date.now();
    const staleData = [];
    const freshData = [];

    // Separate stale and fresh weather data
    weatherData.forEach((entry) => {
        if (now - entry.cachedAt > MAX_CACHE_AGE) {
            staleData.push(entry.id);
        } else {
            freshData.push(entry);
        }
    });

    // Fetch updated weather data for stale locations
    for (const id of staleData) {
        try {
            const updatedWeatherData = await fetchWeatherDataForLocation(locations, id, scale);
            store.dispatch(addWeatherData({...updatedWeatherData, id}));
        } catch (error) {
            console.error(`Error fetching weather data for location ID ${id}:`, error);
        }
    }
};

// Save state to localStorage whenever it changes
store.subscribe(() => {
    const state = store.getState();
    const stateToSave = {
        settings: state.settings,
        locations: state.locations,
        weatherData: state.weatherData,
    };
    saveStateToLocalStorage(stateToSave);
});

// Initialize cache update process
loadAndUpdateWeatherData();

export default store;