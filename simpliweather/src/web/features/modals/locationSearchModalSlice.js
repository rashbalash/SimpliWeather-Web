import { createSlice } from '@reduxjs/toolkit';

const locationSearchModalSlice = createSlice({
    name: 'locationSearchModal',
    initialState: {
        isLocationSearchModalOpen: false,
    },
    reducers: {
        setIsLocationSearchModalOpen: (state, action) => {
            state.isLocationSearchModalOpen = action.payload;
        }
    }
});

export const { setIsLocationSearchModalOpen } = locationSearchModalSlice.actions;
export default locationSearchModalSlice.reducer;
