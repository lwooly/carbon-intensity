import React from 'react';
import { Box, Card } from '@mui/material';
import { fetchIntensityForecast } from '../features/forecastWidgetSlice';
import { useDispatch } from 'react-redux';

const ForecastWidget = () => {
    const dispatch = useDispatch()

    const dayForecastData = dispatch(fetchIntensityForecast())

    const forcastData = new Array(12).fill('example data')

    const forecastCards = forcastData.map((hourData, i) => {
        return <Card key={i} sx={{m:1}}>{hourData}</Card>
    })
    return (
        <Box sx={{display:'flex', padding:'5em'}}>
            {forecastCards}
        </Box>
    );
};

export default ForecastWidget;