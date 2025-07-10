import { createSlice } from '@reduxjs/toolkit';

let nextId = 1;

const eventSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
    },
    reducers: {
        addEvent: (state, action) => {
            const newEvent = {
                id: nextId++,
                ...action.payload
            };
            state.events.push(newEvent);
        },
        removeEvent: (state, action) => {
            state.events = state.events.filter(event => event.id !== action.payload);
        },
        updateEvent: (state, action) => {
            const index = state.events.findIndex(event => event.id === action.payload.id);
            if (index !== -1) {
                state.events[index] = action.payload;
            }
        },
        clearEvents: (state) => {
            state.events = [];
        }
    },
});

export const { addEvent, removeEvent, updateEvent, clearEvents } = eventSlice.actions;
export default eventSlice.reducer;
