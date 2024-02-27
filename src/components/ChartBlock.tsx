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
    <Box
      className="chartBlock"
      sx={{
        height: '100%',
        display: 'flex',
        width: '100%',
        position: 'relative',
      }}
    >
      <Box sx={{ flexGrow: 1, flexShrink: 1, width: '100%' }}>
        <EnergyMixChart mixData={chartData} />
      </Box>
      <IconButton
        sx={{ position: 'absolute', top: 0, right: 1 }}
        onClick={() => setShowCardChartIndex(null)}
      >
        <HighlightOffTwoToneIcon />
      </IconButton>
    </Box>
  );
}

export default ChartBlock;
