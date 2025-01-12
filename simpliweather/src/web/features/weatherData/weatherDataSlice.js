import { createSlice } from '@reduxjs/toolkit';

const weatherDataSlice = createSlice({
    name: 'weatherData',
    initialState: {
        weatherDataByLocation: [],
        isLoading: false,
    },
    reducers: {
        /**
         * Adds new weather data for a specific location.
         * If weather data for the location already exists, it replaces it.
         */
        addWeatherData: (state, action) => {
            const existingIndex = state.weatherDataByLocation.findIndex(
                (data) => data.id === action.payload.id
            );

            if (existingIndex !== -1) {
                // Replace existing data
                state.weatherDataByLocation[existingIndex] = { ...action.payload, cachedAt: Date.now() };
            } else {
                // Add new data
                state.weatherDataByLocation.push({ ...action.payload, cachedAt: Date.now() });
            }
        },

        removeAllWeatherData: (state) => {
            state.weatherDataByLocation = [];
        },

        removeWeatherDataById: (state, action) => {
            state.weatherDataByLocation = state.weatherDataByLocation.filter(
                (data) => data.id !== action.payload
            );
        },

        setIsLoadingStatus: (state, newLoadingStatus) => {
            state.isLoading = newLoadingStatus.payload;
        }
    },
});

export const { addWeatherData, removeAllWeatherData, removeWeatherDataById, removeStaleWeatherData, setIsLoadingStatus } = weatherDataSlice.actions;
export default weatherDataSlice.reducer;
