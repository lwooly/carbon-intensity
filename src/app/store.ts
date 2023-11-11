import { configureStore } from '@reduxjs/toolkit';
import regionalForecastReducer from '../features/slices/regionalForecastSlice';
import stylesReducer from '../features/slices/stylesSlice';

const store = configureStore({
  reducer: {
    regionalForecast: regionalForecastReducer,
    // forecast: forecastReducer,
    appStyles: stylesReducer,
  },
});

//define and export root state
export type RootState = ReturnType<typeof store.getState>;

export default store;