// redux/savedSlice.js
import { createSlice } from '@reduxjs/toolkit';

const savedSlice = createSlice({
    name: 'saved',
    initialState: {
        dynasties: [],
    },
    reducers: {
        saveDynasty: (state, action) => {
            const exists = state.dynasties.find(item => item.name === action.payload.name);
            if (!exists) {
                state.dynasties.push(action.payload);
            }
        },
        removeDynasty: (state, action) => {
            const nameToRemove = action.payload;
            state.dynasties = state.dynasties.filter(item => item.name !== nameToRemove);
        }
    },
});

export const { saveDynasty,removeDynasty } = savedSlice.actions;
export default savedSlice.reducer;
