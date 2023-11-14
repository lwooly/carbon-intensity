import { useEffect, useState } from 'react';
import {
  Paper,
  Card,
  Box,
  Button,
  MobileStepper,
  Typography,
  List,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import { LocalConvenienceStoreOutlined } from '@mui/icons-material';
import BasicModal from './BasicModal';
import HourForecastCard from './HourForecastCard';
import EnergyMixChart from './EnergyMixChart';

function ForecastCarousel({ values, status, location }) {
  const theme = useTheme();
  const [energyMixCardIndex, setEnergyMixCardIndex] = useState(null);

  // number of cards to show
  const cardsNum = 6;
  // save state of value indexs to display in the carousel.
  const [cardIndexs, setCardIndexs] = useState(
    Array.from({ length: cardsNum }, (_, i) => i)
  );

  // handle click on hour bar to show energy mix data chart for that hour
  const handleBarClick = (cardIndex) => {
    if (energyMixCardIndex === null) {
      setEnergyMixCardIndex(cardIndex);
    } else {
      setEnergyMixCardIndex(null)
  };
}

  useEffect(() => {
    if (energyMixCardIndex!== null) {
      setEnergyMixCardIndex(null)
    }
  },[values, location])

  // create card data
  const cards = values.map((hourData, i) => {
    return (
      <HourForecastCard
        key={i}
        values={hourData}
        status={status}
        handleClick={() => handleBarClick(i)}
      />
    );
  });

  // handle click on buttons to show the correct cards in the carousel.
  const handleClick = (event) => {
    const action = event.target.getAttribute('data-action');
    let n = 0;
    if (action === 'next') {
      n = 1;
    }
    if (action === 'previous') {
      n = -1;
    }
    const newCardIndexs = cardIndexs.map((cardIndex) => {
      return (cardIndex += n);
    });
    setCardIndexs(newCardIndexs);
  };

  // modal info
  const modalTitle = 'Carbon Intensity Forcast Information';
  const modalDescriptiveText =
    'The "carbon intensity" of electricity is a measure of how many grams of carbon dioxide (CO2) emissions are produced for every kilowatt-hour of electricity consumed. This number will be higher when a significant amount of coal or gas is being used and lower when more renewables (like wind or solar) or nuclear energy are being used.';

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
        <BasicModal
          icon={<InfoIcon />}
          title={modalTitle}
          text={modalDescriptiveText}
        />
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
        }}
      >
        {/* show the correct cards in the carousel */}
        {energyMixCardIndex === null && cardIndexs.map((cardIndex) => cards[cardIndex])}
        {energyMixCardIndex !== null && cards[energyMixCardIndex]}
      {energyMixCardIndex !== null && <EnergyMixChart mixData={values[energyMixCardIndex]}/>}
      </List>
      <Box sx={{ display: 'flex' }}>
        <MobileStepper
          variant="progress"
          steps={cards.length - cardIndexs.length + 1}
          position="static"
          activeStep={cardIndexs[0]}
          sx={{ flexGrow: 1 }}
          backButton={
            <Button
              variant="outlined"
              data-action="previous"
              onClick={handleClick}
              disabled={cardIndexs[0] < 1 || energyMixCardIndex !== null}
            >
              Previous
            </Button>
          }
          nextButton={
            <Button
              variant="outlined"
              data-action="next"
              onClick={handleClick}
              disabled={cardIndexs[0] > cards.length - cardIndexs.length - 1 || energyMixCardIndex !== null}
            >
              Next
            </Button>
          }
        />
      </Box>
    </Card>
  );
}

export default ForecastCarousel;
