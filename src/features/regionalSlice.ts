import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRegionalData = createAsyncThunk('regional/fetchRegional', async () => {
        const response = await fetch('https://api.carbonintensity.org.uk/regional')
        // const response = await fetch('https://ional') //for error testing
        const data = await response.json()

        //delay for testing
        await new Promise(resolve => setTimeout(resolve, 2000))

        return data.data[0]
})

const regionalSlice = createSlice({
    name: 'regional',
    initialState: {
        regionData: {},
        status: 'idle',
        error: null
    },

    reducers: {
        addData: state => {
            state.test2 = "test"
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
        .addCase(fetchRegionalData.rejected,(state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export default regionalSlice.reducer

//selectors
export const selectAllRegionalData = state => state.regional.regionData