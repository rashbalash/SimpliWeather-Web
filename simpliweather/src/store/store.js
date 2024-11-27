import { configureStore } from '@reduxjs/toolkit';

// Placeholder reducers (you will add these later)
import exampleReducer from './exampleSlice';

const store = configureStore({
  reducer: {
    example: exampleReducer, // Add your reducers here
  },
});

export default store;