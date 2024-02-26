import { Box, IconButton } from '@mui/material';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import { Dispatch, SetStateAction } from 'react';
import EnergyMixChart from './EnergyMixChart';
import { ForecastDataItem } from '../lib/utils/structureForcecastFn';

function ChartBlock({
  setShowCardChartIndex,
  chartData,
}: {
  setShowCardChartIndex: Dispatch<SetStateAction<number | null>>;
  chartData: ForecastDataItem | null;
}) {
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
