import React, { useEffect } from 'react';
import { Box, Card, Typography } from '@mui/material';
import { fetchIntensityForecast } from '../features/forecastWidgetSlice';
import { useDispatch, useSelector } from 'react-redux';
import HourForecastCard from './HourForecastCard';
import ForecastCarousel from './ForecastCarousel';

const ForecastWidget = () => {
    const dispatch = useDispatch()

    // get forecast data from state
    const forecastWidgetState = useSelector(state => {
        return state.forecastWidget
    })

    //destructure state
    const { forecastData, status, error } = forecastWidgetState

    //fetch forecast data from API
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchIntensityForecast())
        }
    }, [status, dispatch])


    let cardData = new Array(12).fill('data');
    let location = {}

    if (status === 'loaded' && forecastData?.data?.data) {
        location = {
            postcode:forecastData.data.postcode,
            area:forecastData.data.shortname
        }
        cardData = forecastData.data.data.filter((hourData, i) => {
            if (i % 2 === 0 && i < 23) {
                return true
            }
        })
    }


    return (
        <Box sx={{display: 'flex'}}>
            <ForecastCarousel values={cardData} status={status} location={location}/>
            {error && <Typography>API error: {error}</Typography>}
        </Box>
    );
};

export default ForecastWidget;