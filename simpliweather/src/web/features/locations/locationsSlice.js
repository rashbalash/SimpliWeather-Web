import { createSlice } from '@reduxjs/toolkit';

const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    locations: [],
  },
  reducers: {
    addLocation(state, action) {
      state.locations.push(action.payload);
    },
    removeLocation(state, action) {
      state.locations = state.locations.filter(
        (location) => location !== action.payload
      );
    },
    clearLocations(state) {
      state.locations = [];
    },
  },
});

export const { addLocation, removeLocation, clearLocations } = locationsSlice.actions;
export default locationsSlice.reducer;