import React, { useEffect } from 'react';
import { Box, Card, Typography } from '@mui/material';
import { fetchIntensityForecast } from '../features/slices/forecastWidgetSlice';
import { useDispatch, useSelector } from 'react-redux';
import HourForecastCard from './HourForecastCard';
import ForecastCarousel from './ForecastCarousel';
import { fetchRegionalData } from '../features/slices/regionalForecastSlice';
import { HouseTwoTone } from '@mui/icons-material';

const ForecastWidget = () => {
    const dispatch = useDispatch()

    // get forecast data from redux store
    const regionalForecastState = useSelector(state => {
        return state.regionalForecast
    })

    // console.log(regionalForecastState)

    //get region that forecastis to be shown for 
    //this can come after once regional array is created.
    const regionId = useSelector(state => state.regionalForecast.searchArea.regionId) - 1 //would be better to map and return selections based on region id not array position

    //destructure state
    const { regionData: { data: forecastData }, status, error } = regionalForecastState

    //Forecast data has an arrray of regional data for all regions every 30 mins.

    //set card array to allow for loading spinners to show
    let cardData = new Array(12).fill('data');

    let location = '';

    //check store status and forecast data avaialble
    if (status === 'loaded' && forecastData) {

        //manipulate forecast data to easier to use state for card componenents in an object

        cardData = forecastData
            //get 12 hour slots - to be refined
            .filter((_, i) => i % 2 === 0 && i < 23)
            //get specific regional data from the forecast data
            .map(hourDataGB => {
                return {
                    fromTime: hourDataGB.from,
                    intensity: hourDataGB.regions[regionId].intensity,
                    location: hourDataGB.regions[regionId].shortname,
                    regionId
                }
            })

        location = cardData[0].location
        if (location === 'GB') {
            location = 'Nationwide average'
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <ForecastCarousel values={cardData} status={status} location={location} />
            {error && <Typography>API error: {error}</Typography>}
        </Box>
    );
};

export default ForecastWidget;