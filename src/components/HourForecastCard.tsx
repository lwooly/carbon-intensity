import { Card, Typography } from '@mui/material';
import React from 'react';
import CircularIndeterminate from './CircularIndeterminate';



const HourForecastCard = ({ values, status }) => {

    let from, forecast, index;

    if (status === "loaded" && values) {
        from = values.from;
        forecast = values.intensity?.forecast;
        index = values.intensity?.index;
    }










    return (
        <Card sx={{ minWidth: 60 }}>
            {status === 'loading' && <CircularIndeterminate />}
            {status === 'loaded' && (
                <>
                    <Typography>From: {from}</Typography>
                    <Typography>Intensity: {forecast}</Typography>
                    <Typography>Index: {index}</Typography>
                </>
            )}
        </Card>
    );
}

export default HourForecastCard;