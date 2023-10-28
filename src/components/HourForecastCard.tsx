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

    //present time data
    const datetime = new Date(from)
    const time = datetime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})


    return (
        <Card sx={{ width:'25%', minWidth: 60, minHeight: '10em', padding: '1em', margin: '1em 0', backgroundColor:'lightgrey' }}>
            {status === 'loading' && <CircularIndeterminate/>}
            {status === 'loaded' && (
                <>
                    <Typography variant="h5" gutterBottom>{time}</Typography>
                    <Typography variant="h6" gutterBottom>Intensity: {forecast}</Typography>
                    <Typography variant="h6" gutterBottom>Index: {index}</Typography>
                </>
            )}
        </Card>
    );
}

export default HourForecastCard;