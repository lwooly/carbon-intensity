import { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Card, Box, Typography, List } from '@mui/material';
import HourForecastCard from './HourForecastCard';
import ForecastCarouselModal from './ForecastCarouselModal';
import CarouselControl from './CarouselControl';
import ChartBlock from './ChartBlock';
import structureForcecastFn from '../lib/utils/structureForcecastFn';
import { useAppSelector } from '../app/hooks';

function ForecastCarousel() {
  // const theme = useTheme();

  // get forecast data from redux store
  const forecastState = useAppSelector((state) => {
    return state.regionalForecast;
  });

  // destructure loading and error state for forecast data
  const { status, error } = forecastState;

  // reformat the forecast data for use in the carosel
  const { values, location } = structureForcecastFn({ forecastState });

  const [showCardChartIndex, setShowCardChartIndex] = useState<number | null>(
    null
  );

  // number of cards to show
  const cardsNum = 6;
  // save state of value indexs to display in the carousel.
  const [cardIndexs, setCardIndexs] = useState(
    Array.from({ length: cardsNum }, (_, i) => i)
  );

  // handle click on hour bar to show energy mix data chart for that hour
  const handleBarClick = (cardIndex: number) => {
    if (showCardChartIndex === null) {
      setShowCardChartIndex(cardIndex);
    } else {
      setShowCardChartIndex(null);
    }
  };

  // close chart if data or user location updates.
  useEffect(() => {
    if (showCardChartIndex !== null) {
      setShowCardChartIndex(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, location]); // closes on open if showCardIndex is included in dependants

  // create card data
  const cards = values.map((hourData, i) => {
    return (
      <HourForecastCard
        key={nanoid()}
        values={hourData}
        status={status}
        handleClick={() => handleBarClick(i)}
      />
    );
  });

  return (
    <Card sx={{ p: 2, width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h3" component="h2">
          Carbon Intensity Forecast
        </Typography>
        <ForecastCarouselModal />
      </Box>
      <Typography variant="h6" component="h3">
        Area: {location}
      </Typography>

      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: 2,
          borderRadius: 0.5,
          border: 'solid 1px black',
          md: { flexDirection: 'row' },
          height: 410,
          overflow: 'hidden',
        }}
      >
        {error && <Typography>API error: {error}</Typography>}
        {/* show the correct cards in the carousel for the current time range shown */}
        {showCardChartIndex === null &&
          cardIndexs.map((cardIndex) => cards[cardIndex])}
        {/* On card click show row (card and relevant energy mix chart  */}
        {showCardChartIndex !== null && cards[showCardChartIndex]}
        {showCardChartIndex !== null && (
          <ChartBlock
            setShowCardChartIndex={setShowCardChartIndex}
            showCardChartIndex={showCardChartIndex}
            chartData={values[showCardChartIndex]}
          />
        )}
      </List>
      <CarouselControl
        cardIndexs={cardIndexs}
        setCardIndexs={setCardIndexs}
        cardNumber={cards.length}
        showCardChartIndex={showCardChartIndex}
      />
    </Card>
  );
}

export default ForecastCarousel;
