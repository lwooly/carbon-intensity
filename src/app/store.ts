import { configureStore } from "@reduxjs/toolkit";
import regionalReducer from '../features/regionalSlice'
import forecastWidgetReducer from '../features/forecastWidgetSlice'

export default configureStore({
    reducer:{
        regional:regionalReducer,
        forecastWidget: forecastWidgetReducer
    }
})