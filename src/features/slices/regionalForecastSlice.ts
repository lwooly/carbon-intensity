import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment";

export const fetchRegionalData = createAsyncThunk('regionalForecast/fetchRegional', async () => {
    //new - fetch 24hr for all gb regions.
    const currentDateTime = moment().utc().format('YYYY-MM-DDTHH:mm[Z]');
    const response = await fetch(`https://api.carbonintensity.org.uk/regional/intensity/${currentDateTime}/fw24h`)
    const data = await response.json()

    //delay for testing
    // await new Promise(resolve => setTimeout(resolve, 2000))
    return data
})

//use the api to determine which post code is within each region
export const fetchAreaFromPostCode = createAsyncThunk('regionalForecast/fetchArea', async (postcode: string) => {
    const response = await fetch(`https://api.carbonintensity.org.uk/regional/postcode/${postcode}`)
    const data = await response.json()

    return (data.data[0].regionid)
})


export const fetchUserLocationAndPostcode = createAsyncThunk('regionalForecast/fetchLocationAndPostcode', async () => {
    console.log(`dispatched success`)
    const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    const {latitude, longitude} = position.coords
    const response = await fetch(`https://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}`)
    const postcode = await response.json()
    return postcode.result[0].postcode.split(' ')[0]
})
    const regionalSlice = createSlice({
        name: 'regionalForecast',
        initialState: {
            regionData: {},
            status: 'idle',
            error: null,
            searchArea: {
                regionId: 18, // need to map this better to prevent bugs
                status: 'idle',
                error: null
            },
            userLocation: {
                postcode: '',
                status: 'idle',
                error: null
            }
        },

        reducers: {
            addSearchArea(state, action) {
                state.searchArea.regionId = action.payload
            }

        },
        extraReducers(builder) {
            builder
                //fetch regional data thunk
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

                //fetch area
                .addCase(fetchAreaFromPostCode.pending, (state, action) => {
                    state.searchArea.status = 'loading'
                })
                .addCase(fetchAreaFromPostCode.fulfilled, (state, action) => {
                    state.searchArea.regionId = action.payload
                    state.searchArea.status = 'loaded'
                })
                .addCase(fetchAreaFromPostCode.rejected, (state, action) => {
                    state.searchArea.status = 'failed'
                    state.searchArea.error = action.error.message
                })

                 //fetch location and postcode 
                 .addCase(fetchUserLocationAndPostcode.pending, (state, action) => {
                    state.userLocation.status = 'loading'
                })
                .addCase(fetchUserLocationAndPostcode.fulfilled, (state, action) => {
                    console.log(action.payload, 'payload')
                    state.userLocation.postcode = action.payload
                    state.userLocation.status = 'loaded'
                })
                .addCase(fetchUserLocationAndPostcode.rejected, (state, action) => {
                    state.userLocation.status = 'failed'
                    state.userLocation.error = action.error.message
                })
        }
    })

    export default regionalSlice.reducer

    //selectors
    export const selectAllRegionalData = state => state.regionalForecast.regionData