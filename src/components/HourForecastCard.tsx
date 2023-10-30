import { Card, ListItem, Typography } from '@mui/material';
import { Box }from '@mui/material';
import React from 'react';
import CircularIndeterminate from './CircularIndeterminate';
import { intensityColors } from '../features/regionalData/regionalDataFns';



const HourForecastCard = ({ values, status }) => {

    console.log(values)

    let from, forecast, index;

    if (status === "loaded" && values) {
        from = values.from;
        forecast = values.forecast.intensity.forecast;
        index = values.forecast.intensity.index;
    }

    //present time data
    const datetime = new Date(from)
    const time = datetime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})


    //render bar chart
    //calculate bar length
    const maxIndex = 350
    const barLength = 10 + 90/maxIndex * Number(forecast)
    const barPerc = `${barLength}%`

    //determine bar colours
    
    const barColour:string =  intensityColors[index]
    // let barColor = '';
    // if (forecast < 40) {

    // } elif (forecast >= 40 && forecast < 120) {

    // } elif (forecast >= 120 && forecast < 200) {
        
    // } elif (forecast >= 120 && forecast < 200) {
        
    // }elif (forecast >= 200 && forecast < 290) {
        
    // } else {
        
    // }




    


    return (
        <ListItem sx={{position:'relative', alignItems:'center',  backgroundColor:'primary.dark', borderRadius:2,}}>
                <Box sx={{width:'100%', height:'100%', display:'flex', gap:3, zIndex:2}}>
                {status === 'loading' && <CircularIndeterminate/>}
                {status === 'loaded' && (
                    <>
                        <Typography variant="h4" component={'p'}>{time}</Typography>
                        <Typography variant="h4" component={'p'}>{index.toUpperCase()}: {forecast} </Typography>
                    </>
                )}
                </Box >
                <Box sx={{position:'absolute', top:0, left:0, height:'100%', width:barPerc, backgroundColor:barColour, zIndex:1, borderRadius:2,}}>
                </Box>
        </ListItem>
    );
}

export default HourForecastCard;