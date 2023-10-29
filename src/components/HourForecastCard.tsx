import { Card, ListItem, Typography } from '@mui/material';
import { Box }from '@mui/material';
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


    //forecast bar chart
    const barLength = 100/350 * Number(forecast)
    const barPerc = `${barLength}%`

    console.log(barPerc, 'barlength')
    


    return (
        <ListItem sx={{display:'flex', alignItems:'center',  backgroundColor:'primary.dark', borderRadius:2,}}>
            {status === 'loading' && <CircularIndeterminate/>}
            {status === 'loaded' && (
                <>
                    <Typography variant="h4" component={'p'}>{time}</Typography>
                    <Typography variant="h4" component={'p'}>{index.toUpperCase()}: </Typography>
                    <Typography variant="h4" component={'p'}>{forecast}</Typography>
                </>
            )}
        </ListItem>
    );
}

export default HourForecastCard;