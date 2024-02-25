import { useEffect, useState } from 'react';
import {
  Card,
  Box,
  Button,
  MobileStepper,
  Typography,
  List,
  IconButton,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import BasicModal from './BasicModal';
import HourForecastCard from './HourForecastCard';
import EnergyMixChart from './EnergyMixChart';
import ForecastCarouselModal from './ForecastCarouselModal';
import CarouselControl from './CarouselControl';

function ChartBlock({setShowCardChartIndex, showCardChartIndex, chartData }) {

  return (
    <Box sx={{ height: '100%', display: 'flex' }}>
      <Box sx={{ flexGrow: 1, justifyContent: 'center', display: 'flex' }}>
        <EnergyMixChart mixData={chartData} />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'start' }}>
        <IconButton onClick={() => setShowCardChartIndex(null)}>
          <HighlightOffTwoToneIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default ChartBlock;
