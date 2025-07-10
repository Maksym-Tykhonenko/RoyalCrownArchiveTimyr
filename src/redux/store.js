import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import { persistConfig } from './persistConfig';
import { combineReducers } from 'redux';
import eventReducer from './slices/eventSlice';
import savedReducer from './slices/savedSlice';
import themeReducer from './slices/themeSlice';

const rootReducer = combineReducers({
  events: eventReducer,
  saved: savedReducer,
  theme: themeReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
