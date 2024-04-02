import { Box, Paper, Typography, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
// import enviroImg from '../assets/nicholas-doherty-pONBhDyOFoM-unsplash.jpg';
import { selectAllStyles } from '../features/slices/stylesSlice';

function HomeTitle() {
  const theme = useTheme();
  const {
    padding: { xs, sm, md, lg, xl },
    darkMode,
  } = useSelector(selectAllStyles);

  const backgroundColor = darkMode
    ? theme.palette.secondary.dark
    : theme.palette.secondary.light;

  return (
    <Paper
      sx={{
        display: 'flex',
        bgcolor: backgroundColor,
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
        <Typography variant="h4" component="h1" gutterBottom>
          Smart Energy Management for Carbon Reduction
        </Typography>
        <Typography variant="body1" component="p">
          Leverage our dashboard with{' '}
          <a href="https://carbonintensity.org.uk/">National Grid ESO API</a>{' '}
          data to smartly manage energy use and cut carbon emissions from
          electricity usage. Strategise your home appliance usage and EV
          charging with real-time insights.Visualise UK carbon distribution for
          informed environmental actions and gain a deeper understanding of
          national carbon emission trends.{' '}
          {/* This advanced API harnesses the power of cutting-edge Machine Learning and sophisticated power system modeling to anticipate carbon intensity and the generation mix for each region in Great Britain up to 96 hours ahead. */}
        </Typography>
      </Box>
    </Paper>
  );
}

export default HomeTitle;
