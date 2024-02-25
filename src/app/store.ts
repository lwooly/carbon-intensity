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

// Define and export root state
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;