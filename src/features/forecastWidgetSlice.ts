import { dialogTitleClasses } from "@mui/material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";


export const fetchIntensityForecast = createAsyncThunk('forecastWidget/fetchForecastData',async () => {
    const postcode = 'BS3'
    const currentDateTime = moment().utc().format('YYYY-MM-DDTHH:mm[Z]');
    console.log(`https://api.carbonintensity.org.uk/regional/intensity/${currentDateTime}/fw24h/postcode/${postcode}`)
    const response = await fetch(`https://api.carbonintensity.org.uk/regional/intensity/${currentDateTime}}/fw24h/postcode/${postcode}`)
})

const forecastWidgetSlice = createSlice({
    
        name: 'forecastWidget',
        initialState: {
            forecastData: {},
            status: 'idle',
            error: null,
            searchQuery: null
        },

        reducers: {
            addSearchQuery(state, action) {
                state.searchQuery = action.payload
            }
        },

        extraReducers(builder) {
            builder
            .addCase(fetchIntensityForecast.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchIntensityForecast.fulfilled, (state, action) => {
                state.status = 'loaded',
                state.forecastData = action.payload;
            })
            .addCase(fetchIntensityForecast.rejected, (state, action) => {
                state.error = action.error.message
            })
        }

    }

)

export default forecastWidgetSlice.reducer