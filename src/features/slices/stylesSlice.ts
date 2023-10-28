import { createSlice } from "@reduxjs/toolkit";

const stylesSlice = createSlice({
    name:'appStyles',
    initialState: {
            padding: {
                xs: 3,
                sm: 3,
                md: 3,
                lg: 4,
                xl: 5
            },
            margin: {
                xs: 1,
                sm: 2,
                md: 3,
                lg: 4,
                xl: 5
            }
    },
    reducers: {
    }
})

export default stylesSlice.reducer

export  const selectAllStyles = state => state.appStyles