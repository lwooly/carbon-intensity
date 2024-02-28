import { useEffect, useRef, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { Card, Box, Typography, List, useTheme } from '@mui/material';
import HourForecastCard from './HourForecastCard';
import ForecastCarouselModal from './ForecastCarouselModal';
import CarouselControl from './CarouselControl';
import ChartBlock from './ChartBlock';
import structureForecastFn from '../lib/utils/structureForcecastFn';
import { useAppSelector } from '../app/hooks';
import determinePlugAction from '../lib/utils/plugActionFn';

function ForecastCarousel() {
  const theme = useTheme();
  // number of cards to show
  const cardsNum = 6;
  // save state of value indexs to display in the carousel.
  const [cardIndexs, setCardIndexs] = useState(
    Array.from({ length: cardsNum }, (_, i) => i)
  );

  // get forecast data from redux store
  const forecastState = useAppSelector((state) => {
    return state.regionalForecast;
  });

  // destructure loading and error state for forecast data
  const { status, error } = forecastState;

  // reformat the forecast data for use in the carosel
  const { values, location } = structureForecastFn({ forecastState });

  // determine when user should plug in and unplug
  const updatedValues = determinePlugAction({ values });

  // set state for the card index to show chart for (on click)
  const [showCardChartIndex, setShowCardChartIndex] = useState<number | null>(
    null
  );

  // maintain height of carousel container
  const [carouselHeight, setCarouselHeight] = useState<number | null>(null);

  const heightRef = useRef<HTMLUListElement>(null);

  const container: HTMLElement | null = heightRef.current;

  useEffect(() => {
    if (container) {
      const height: number = container?.offsetHeight;
      if (carouselHeight === null) setCarouselHeight(height);
    }
  }, [heightRef, container, carouselHeight]);

  const carouselHeightProp = carouselHeight || '100%';

  // handle click on hour bar to show energy mix data chart for that hour
  const handleBarClick = (cardIndex: number) => {
    if (showCardChartIndex === null) {
      setShowCardChartIndex(cardIndex);
    } else {
      setShowCardChartIndex(null);
    }
  };

  // create card data
  const cards = updatedValues.map((hourData, i) => {
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
    <Card component="article" sx={{ p: 2, width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h4" component="h2">
          Carbon Intensity Forecast
        </Typography>
        <ForecastCarouselModal />
      </Box>
      <Typography variant="h6" component="h3">
        Area: {status === 'loaded' ? location : `${status}...`}
      </Typography>
      <Typography variant="body1" component="p">
        Click bar to view Energy Mix breakdown.
      </Typography>
      {error ? (
        <Typography>API error: {error}</Typography>
      ) : (
        <List
          ref={heightRef}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            padding: 2,
            borderRadius: 0.5,
            border: 'solid 1px',
            borderColor: theme.palette.grey[400],
            md: { flexDirection: 'row' },
            height: carouselHeightProp,
            minHeight: '400px',
            overflow: 'hidden',
            width: '100%',
          }}
        >
          {/* show the correct cards in the carousel for the current time range shown */}
          {showCardChartIndex === null &&
            cardIndexs.map((cardIndex) => cards[cardIndex])}
          {/* On card click show row (card and relevant energy mix chart  */}
          {showCardChartIndex !== null && (
            <>
              {cards[showCardChartIndex]}
              <ChartBlock
                setShowCardChartIndex={setShowCardChartIndex}
                chartData={values[showCardChartIndex]}
              />
            </>
          )}
        </List>
      )}
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
