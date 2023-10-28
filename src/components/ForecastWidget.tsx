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

    if (status === 'loaded' && forecastData?.data?.data) {
        cardData = forecastData.data.data.filter((hourData, i) => {
            if (i % 2 === 0 && i < 23) {
                return true
            }
        })
    }

    console.log(cardData)

    return (
        <Box sx={{display: 'flex', padding: '5em' }}>
            <ForecastCarousel values={cardData} status={status}/>
            {error && <Typography>API error: {error}</Typography>}
        </Box>
    );
};

export default ForecastWidget;