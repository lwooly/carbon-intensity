import { configureStore } from "@reduxjs/toolkit";
import regionalReducer from '../features/slices/regionalSlice'
import forecastWidgetReducer from '../features/slices/forecastWidgetSlice'
import stylesReducer from "../features/slices/stylesSlice";

export default configureStore({
    reducer:{
        regional:regionalReducer,
        forecastWidget: forecastWidgetReducer,
        appStyles: stylesReducer
    }
})