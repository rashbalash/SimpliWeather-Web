import { configureStore } from '@reduxjs/toolkit';
import { saveStateToLocalStorage, loadStateFromLocalStorage } from '../services/localStorage/localStorage';

import settingsSlice from "../web/features/settings/settingsSlice";
import locationsSlice from "../web/features/locations/locationsSlice";

const persistedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: {
    settings: settingsSlice,
    locations: locationsSlice,
  },
  preloadedState: persistedState
});

store.subscribe(() => {
  const state = store.getState();
  const settingsToSave = {
    settings: state.settings,
    locations: state.locations,
  };
  saveStateToLocalStorage(settingsToSave);
});

export default store;