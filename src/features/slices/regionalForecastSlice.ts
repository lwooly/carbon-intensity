import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const fetchRegionalData = createAsyncThunk('regional/fetchRegional', async () => {


    //new - fetch 24hr for all gb regions.
    const currentDateTime = moment().utc().format('YYYY-MM-DDTHH:mm[Z]');
    const response = await fetch(`https://api.carbonintensity.org.uk/regional/intensity/${currentDateTime}/fw24h`)
    //old - fetch current only.
    // const response = await fetch('https://api.carbonintensity.org.uk/regional')
    // const response = await fetch('https://ional') //for error testing
    const data = await response.json()

    //delay for testing
    await new Promise(resolve => setTimeout(resolve, 2000))
    return data

})

const regionalSlice = createSlice({
    name: 'regionalForecast',
    initialState: {
        regionData: {},
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
            .addCase(fetchRegionalData.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchRegionalData.fulfilled, (state, action) => {
                state.regionData = action.payload
                state.status = 'loaded'
            })
            .addCase(fetchRegionalData.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export default regionalSlice.reducer

//selectors
export const selectAllRegionalData = state => state.regionalForecast.regionData