//NOT USED



import { dialogTitleClasses } from "@mui/material";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const fetchIntensityForecast = createAsyncThunk('forecastWidget/fetchForecastData',async () => {
    const postcode = 'BS3'
    const currentDateTime = moment().utc().format('YYYY-MM-DDTHH:mm[Z]');
    // console.log(`https://api.carbonintensity.org.uk/regional/intensity/${currentDateTime}/fw24h/postcode/${postcode}`)
    const response = await fetch(`https://api.carbonintensity.org.uk/regional/intensity/${currentDateTime}/fw24h/postcode/${postcode}`)
    const data = await response.json()
    //delay for testing
    await new Promise(resolve => setTimeout(resolve, 2000))
    return data
})

const forecastSlice = createSlice({
    
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
                // console.log(action.payload)
                state.forecastData = action.payload,
                state.status = 'loaded'
                
            })
            .addCase(fetchIntensityForecast.rejected, (state, action) => {
                state.error = action.error.message
            })
        }

    }

)

export default forecastSlice.reducer