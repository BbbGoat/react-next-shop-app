import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';

const rootReducer = combineReducers({
    auth: authReducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;

export default store;