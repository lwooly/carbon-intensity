import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import {
  RegionData,
  RegionalForecastState,
} from '../../types/RegionalForecast.types';
import type { RootState } from '../../app/store';
// import { RegionData, RegionalForecastState } from '../../types/RegionalForecast.types';

export const fetchRegionalData = createAsyncThunk<RegionData>(
  'regionalForecast/fetchRegional',
  async () => {
    // new - fetch 24hr for all gb regions.
    const currentDateTime = moment().utc().format('YYYY-MM-DDTHH:mm[Z]');
    const response = await fetch(
      `https://api.carbonintensity.org.uk/regional/intensity/${currentDateTime}/fw24h`
    );
    const data = await response.json();

    // console.log(data, 'save for test data');

    // delay for testing
    // await new Promise(resolve => setTimeout(resolve, 2000))
    return data;
  }
);

// use the api to determine which post code is within each region
export const fetchAreaFromPostCode = createAsyncThunk(
  'regionalForecast/fetchArea',
  async (postcode: string) => {
    const response = await fetch(
      `https://api.carbonintensity.org.uk/regional/postcode/${postcode}`
    );
    const data = await response.json();

    return {
      regionId: data.data[0].regionid,
      regionName: data.data[0].shortname,
    };
  }
);

export const fetchUserLocationAndPostcode = createAsyncThunk(
  'regionalForecast/fetchLocationAndPostcode',
  async () => {
    const position: GeolocationPosition = await new Promise(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );
    const { latitude, longitude } = position.coords;
    const response = await fetch(
      `https://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}`
    );
    const postcode = await response.json();
    return postcode.result[0].postcode.split(' ')[0];
  }
);

export const initialForecastState: RegionalForecastState = {
  regionData: {
    data: [],
  },
  status: 'idle',
  error: null,
  searchArea: {
    regionId: 18, // need to map this better to prevent bugs
    regionName: 'GB',
    status: 'idle',
    error: null,
  },
  userLocation: {
    postcode: '',
    status: 'idle',
    error: null,
  },
};

const regionalSlice = createSlice({
  name: 'regionalForecast',
  initialState: initialForecastState,
  reducers: {
    addSearchArea(state, action) {
      state.searchArea.regionName = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // fetch regional data thunk
      .addCase(fetchRegionalData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchRegionalData.fulfilled,
        (state, action: PayloadAction<RegionData>) => {
          state.regionData = action.payload;
          state.status = 'loaded';
        }
      )
      .addCase(fetchRegionalData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? null;
      })

      // fetch area
      .addCase(fetchAreaFromPostCode.pending, (state) => {
        state.searchArea.status = 'loading';
      })
      .addCase(fetchAreaFromPostCode.fulfilled, (state, action) => {
        state.searchArea.regionId = action.payload.regionId;
        state.searchArea.regionName = action.payload.regionName;
        state.searchArea.status = 'loaded';
      })
      .addCase(fetchAreaFromPostCode.rejected, (state, action) => {
        state.searchArea.status = 'failed';
        state.searchArea.error = action.error.message ?? null;
      })

      // fetch location and postcode
      .addCase(fetchUserLocationAndPostcode.pending, (state) => {
        state.userLocation.status = 'loading';
      })
      .addCase(fetchUserLocationAndPostcode.fulfilled, (state, action) => {
        state.userLocation.postcode = action.payload;
        state.userLocation.status = 'loaded';
      })
      .addCase(fetchUserLocationAndPostcode.rejected, (state, action) => {
        state.userLocation.status = 'failed';
        state.userLocation.error = action.error.message ?? null;
      });
  },
});

export default regionalSlice.reducer;

export const { addSearchArea } = regionalSlice.actions;

// selectors
export const selectAllRegionalData = (state: RootState) =>
  state.regionalForecast.regionData;
