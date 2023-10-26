import { configureStore } from "@reduxjs/toolkit";
import regionalReducer from '../features/regionalSlice'

export default configureStore({
    reducer:{
        regional:regionalReducer
    }
})