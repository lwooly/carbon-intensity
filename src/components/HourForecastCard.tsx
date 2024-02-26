import { ListItem, Typography, Box } from '@mui/material';
import CircularIndeterminate from './CircularIndeterminate';
import { intensityColors } from '../features/regionalData/regionalDataFns';
import { ForecastDataItem } from '../lib/utils/structureForcecastFn';

function HourForecastCard({
  values,
  status,
  handleClick,
}: {
  values: ForecastDataItem | null;
  status: string;
  handleClick: () => void;
}) {
  // Initialise variables with default values.
  let from = '';
  let forecast;
  let index = '';

  // Check if data is loaded.
  if (status === 'loaded' && values) {
    from = values.from || '';
    forecast = values?.forecast?.intensity?.forecast;
    index = values?.forecast?.intensity?.index || '';
  }

  // if from exists create a date. Otherwise create from current time
  const datetime = new Date(from);
  const time = datetime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  // render bar chart
  // calculate bar length
  const maxIndex = 400;
  const barLength = 10 + (90 / maxIndex) * Number(forecast);
  const barPerc = `${barLength}%`;

  // determine bar colours
  const barColour: string = intensityColors[index];

  return (
    <ListItem
      onClick={handleClick}
      sx={{
        position: 'relative',
        alignItems: 'center',
        backgroundColor: 'primary.dark',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          gap: 3,
          zIndex: 2,
        }}
      >
        {status === 'loading' && (
          <Box
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <CircularIndeterminate />
          </Box>
        )}
        {status === 'loaded' && (
          <>
            <Typography variant="h4" component="p">
              {time}
            </Typography>
            <Typography variant="h4" component="p">
              {index.toUpperCase()}: {forecast}{' '}
            </Typography>
          </>
        )}
      </Box>
      <Box
        data-testid="index-bar"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: barPerc,
          backgroundColor: barColour,
          zIndex: 1,
          borderRadius: 2,
        }}
      />
    </ListItem>
  );
}

export default HourForecastCard;
