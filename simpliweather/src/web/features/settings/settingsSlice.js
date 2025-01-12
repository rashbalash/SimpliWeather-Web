import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        isUiFilled: true,
        isDarkMode: true,
        temperatureScale: 'imperial',
        primaryId: 0,
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
        setPrimaryId: (state, action) => {
            state.primaryId = action.payload;
        }
    },
});

export const { toggleUiFill, toggleThemeMode, setTemperatureUnit, setPrimaryId } = settingsSlice.actions;
export default settingsSlice.reducer;