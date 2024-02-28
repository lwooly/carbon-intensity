import { useState } from 'react';
import { ListItem, Typography, Box, useTheme } from '@mui/material';
import DataUsageIcon from '@mui/icons-material/DataUsage';
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
  const theme = useTheme();
  const [hoverState, setHoverState] = useState<boolean>(false);
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
  const barLength = 5 + (80 / maxIndex) * Number(forecast);
  const barPerc = `${barLength}%`;

  // determine bar colours
  const barColour: string = intensityColors[index];

  const iconColor = hoverState ? barColour : theme.palette.grey[400];
  const viewDataTextVisible = hoverState
    ? { display: { xs: 'none', sm: 'block' } }
    : { display: 'none' };

  return (
    <ListItem
      onClick={handleClick}
      onMouseEnter={() => setHoverState(true)}
      onMouseLeave={() => setHoverState(false)}
      sx={{
        position: 'relative',
        alignItems: 'center',
        backgroundColor: 'background.default',
        borderRadius: 2,
        flexGrow: 1,
        overflow: 'hidden',
        minHeight: '62.5px',
        border: 'solid 1px grey',
        '&:hover': {
          cursor: 'pointer',
          border: 'solid 1px',
          borderColor: theme.palette.text.primary,
          boxShadow: '0 0 5px grey',
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          gap: 3,
          zIndex: 2,
          alignItems: 'center',
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
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              gap: '0.5em',
            }}
          >
            <Typography variant="h5" component="p">
              {time}
            </Typography>
            <Typography variant="h5" component="p" sx={{ flexShrink: 1 }}>
              {index !== 'moderate' ? index.toUpperCase() : 'MEDIUM'}
            </Typography>
            <Typography variant="h5" component="p" sx={{ flexShrink: 1 }}>
              {forecast}
            </Typography>

            <Typography
              variant="body2"
              component="p"
              sx={{
                marginLeft: 'auto',
                ...viewDataTextVisible,
              }}
            >
              {'{View data}'}
            </Typography>
          </Box>
        )}
      </Box>
      <DataUsageIcon
        sx={{
          color: iconColor,
          fontSize: '40px',
        }}
      />
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
        }}
      />
    </ListItem>
  );
}

export default HourForecastCard;
