import { Box, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import RegionalMap from '../components/RegionalMap';
import ForecastWidget from '../components/ForecastWidget';
import ForecastCarousel from '../components/ForecastCarousel';
import HomeTitle from '../components/HomeTitle';
import { selectAllStyles } from '../features/slices/stylesSlice';
import {
  fetchRegionalData,
  fetchAreaFromPostCode,
  fetchUserLocationAndPostcode,
} from '../features/slices/regionalForecastSlice';

function Home() {
  const { padding, margin } = useSelector(selectAllStyles);

  const dispatch = useDispatch();
  // loaded regional data state from redux store for graphics on this page

  // get user location and postcode
  const userLocationStatus = useSelector(
    (state) => state.regionalForecast.userLocation.status
  );

  useEffect(() => {
    if (userLocationStatus === 'idle') {
      dispatch(fetchUserLocationAndPostcode());
    }
  }, [userLocationStatus, dispatch]);

  // get search area from postcode
  const postcode = useSelector(
    (state) => state.regionalForecast.userLocation.postcode
  );
  const areaSearchStatus = useSelector(
    (state) => state.regionalForecast.searchArea.status
  );

  useEffect(() => {
    if (userLocationStatus === 'loaded') {
      dispatch(fetchAreaFromPostCode(postcode));
    }
  }, [dispatch, postcode]);

  const regionalDataState = useSelector(
    (state) => state.regionalForecast.status
  );

  useEffect(() => {
    if (regionalDataState === 'idle') {
      dispatch(fetchRegionalData());
    }
  }, [regionalDataState, dispatch]);

  console.log(userLocationStatus);

  return (
    <Grid
      container
      spacing={2}
      sx={{ p: 1, maxWidth: '100%', overflow: 'hidden' }}
    >
      <Grid item md={8}>
        <Box sx={{ mb: { xs: 1, md: 0 } }}>
          <HomeTitle />
        </Box>
        <ForecastWidget />
      </Grid>
      <Grid item md={4}>
        <RegionalMap />
      </Grid>
    </Grid>
  );
}

export default Home;
