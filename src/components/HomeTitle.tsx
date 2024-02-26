import { Box, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
// import enviroImg from '../assets/nicholas-doherty-pONBhDyOFoM-unsplash.jpg';
import { selectAllStyles } from '../features/slices/stylesSlice';

function HomeTitle() {
  const {
    padding: { xs, sm, md, lg, xl },
  } = useSelector(selectAllStyles);

  return (
    <Paper
      sx={{
        display: 'flex',
        bgcolor: 'secondary.light',
        p: {
          xs,
          sm,
          md,
          lg,
          xl,
        },
        width: '100%',
      }}
    >
      <Box sx={{ flex: 1, pr: 2 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sustainable choices through insight...
        </Typography>
        <Typography variant="body1" component="p">
          Welcome to our dashboard, offering insights from the National Grid ESO
          Carbon Intensity Forecast API to support your environmentally
          conscious decisions. Utilise this data to make informed choices that
          contribute to sustainability. For instance, consider charging your
          electric vehicle during periods of low carbon intensity. Together, we
          can make a meaningful difference in reducing our carbon footprint.{' '}
          {/* This advanced API harnesses the power of cutting-edge Machine Learning and sophisticated power system modeling to anticipate carbon intensity and the generation mix for each region in Great Britain up to 96 hours ahead. */}
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
  );
}

export default HomeTitle;
