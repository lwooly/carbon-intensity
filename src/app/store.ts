import { configureStore } from "@reduxjs/toolkit";
import regionalForecastReducer from '../features/slices/regionalForecastSlice'
import forecastReducer from '../features/slices/forecastWidgetSlice'
import stylesReducer from "../features/slices/stylesSlice";

export default configureStore({
    reducer:{
        regionalForecast:regionalForecastReducer,
        // forecast: forecastReducer,
        appStyles: stylesReducer
    }
})