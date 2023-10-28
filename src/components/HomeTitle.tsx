import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import enviroImg from '../assets/nicholas-doherty-pONBhDyOFoM-unsplash.jpg'
import { selectAllStyles } from '../features/slices/stylesSlice';

const HomeTitle = () => {
const {padding, margin} = useSelector(selectAllStyles)

    return (
        <>
            <Paper sx={{display:'flex', bgcolor:'secondary.light', p:padding, m:margin}}>
            <Box sx={{ flex: 1, pr: 2 }}>
                <Typography variant={'h3'} component={'h1'} gutterBottom>
                    Sustainable choices <br/>through insight...
                </Typography>
                <Typography variant={'body1'} component={'p'}>
                    Welcome to our dashboard, showcasing data from the National Grid ESO Carbon Intensity Forecast API.  By tapping into these insightful forecasts, you can make informed, sustainable choices and play an active role in reducing your carbon footprint. {/*This advanced API harnesses the power of cutting-edge Machine Learning and sophisticated power system modeling to anticipate carbon intensity and the generation mix for each region in Great Britain up to 96 hours ahead.*/}
                </Typography>
            </Box>
            {/* <Box sx={{ 
                    width: '200px', 
                    height: '100%', 
                    overflow: 'hidden',
                    borderRadius: 1,
                    display: 'flex',
                    
                }}>
                <img style={{ 
                    width: '100%', 
                    objectFit: 'cover', 
                }} src={enviroImg} alt="Sustainable power generation" />
            </Box> */}

            </Paper>

        </>
    );
};

export default HomeTitle;