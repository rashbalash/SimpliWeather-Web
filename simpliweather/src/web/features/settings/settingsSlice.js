import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        isUiFilled: true,
        isDarkMode: true,
        temperatureScale: 'F',
    },
    reducers: {
        toggleUiFill: (state) => {
            state.isUiFilled = !state.isUiFilled;
        },
        toggleThemeMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
        },
        setTemperatureUnit: (state, action) => {
            state.temperatureScale = action.payload;
        },
    },
});

export const { toggleUiFill, toggleThemeMode, setTemperatureUnit } = settingsSlice.actions;
export default settingsSlice.reducer;