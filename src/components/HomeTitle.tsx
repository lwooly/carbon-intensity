import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import react.svg from .

const HomeTitle = () => {
    return (
        <>
       <Paper>
        <Typography variant={'h3'} component={'h1'}>
        Sustainable choices through insight...
        </Typography>
        <Typography variant={'p'} component={'p'}>
        Welcome to our dashboard, showcasing data from the National Grid ESO Carbon Intensity Forecast API. This advanced API harnesses the power of cutting-edge Machine Learning and sophisticated power system modeling to anticipate carbon intensity and the generation mix for each region in Great Britain up to 96 hours ahead. By tapping into these insightful forecasts, you can make informed, sustainable choices and play an active role in reducing your carbon footprint.
        </Typography>
        <Box sx={{width:30, height:30}}>
        <img src="../asseys/nicholas-doherty-pONBhDyOFoM-unsplash.jpg" alt="" />
        </Box>
       
       </Paper>
       
       </>
    );
};

export default HomeTitle;