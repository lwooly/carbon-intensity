import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import RegionalMap from '../components/RegionalMap';
import HomeTitle from '../components/HomeTitle';

import {
  fetchRegionalData,
  fetchAreaFromPostCode,
  fetchUserLocationAndPostcode,
} from '../features/slices/regionalForecastSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ForecastCarousel from '../components/ForecastCarousel';

function Home() {
  // const { padding, margin } = useAppSelector(selectAllStyles);

  const dispatch = useAppDispatch();
  // call thunks to update state in redux store for graphics on this page

  // get user location and postcode
  const userLocationStatus = useAppSelector(
    (state) => state.regionalForecast.userLocation.status
  );

  useEffect(() => {
    if (userLocationStatus === 'idle') {
      dispatch(fetchUserLocationAndPostcode());
    }
  }, [userLocationStatus, dispatch]);

  // get search area from postcode
  const postcode: string = useAppSelector(
    (state) => state.regionalForecast.userLocation.postcode
  );

  // const areaSearchStatus = useAppSelector(
  //   (state) => state.regionalForecast.searchArea.status
  // );

  useEffect(() => {
    if (userLocationStatus === 'loaded') {
      dispatch(fetchAreaFromPostCode(postcode));
    }
  }, [dispatch, userLocationStatus, postcode]);

  const regionalDataState = useAppSelector(
    (state) => state.regionalForecast.status
  );

  useEffect(() => {
    if (regionalDataState === 'idle') {
      dispatch(fetchRegionalData());
    }
  }, [regionalDataState, dispatch]);

  return (
    <Grid
      container
      spacing={2}
      sx={{ p: 1, maxWidth: '100%', overflow: 'hidden' }}
    >
      <Grid item md={8}>
        <Box sx={{ mb: { xs: 1, md: 1 } }}>
          <HomeTitle />
        </Box>
        <ForecastCarousel />
      </Grid>
      <Grid item md={4}>
        <RegionalMap />
      </Grid>
    </Grid>
  );
}

export default Home;
