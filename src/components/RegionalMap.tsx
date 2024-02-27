/* eslint-disable no-param-reassign */
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import {
  selectAllRegionalData,
  addSearchArea,
} from '../features/slices/regionalForecastSlice';
import {
  IntensityColors,
  svgIntensityColors,
} from '../features/regionalData/regionalDataFns';
import CircularIndeterminate from './CircularIndeterminate';
// import BasicPopover from './Popover';
import { useAppSelector } from '../app/hooks';
import lightenIntensityColors from '../lib/utils/lightenIntensityColors';
import { Data } from '../types/RegionalForecast.types';
import RegionalMapImage from './RegionalMapImage';

function RegionalMap() {
  const theme = useTheme();
  const dispatch = useDispatch();
  // use regional intensity data to colour map svg
  const regionalDataState = useAppSelector(
    (state) => state.regionalForecast.status
  );

  // get regional data from redux store
  const regionalData24hr = useAppSelector(selectAllRegionalData);

  let regionalData: Data | undefined;
  if (regionalDataState === 'loaded') {
    regionalData = regionalData24hr?.data[0];
  }

  // loaded error state from redux store
  const regionalErrorState = useAppSelector(
    (state) => state.regionalForecast.error
  );

  // raised state to manage popover for path buttons
  // const [anchorEl, setAnchorEl] = useState<SVGPathElement | null>(null);

  // state for hovered region
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // state for selected region
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // ref svg file to get path elements
  const svgRef = useRef<SVGSVGElement | null>(null);

  // get colors to represent each regions intensity data
  let svgColors: IntensityColors | undefined;
  let lightSvgColors: IntensityColors | undefined;
  if (regionalData?.regions) {
    svgColors = svgIntensityColors(regionalData);
    lightSvgColors = lightenIntensityColors(svgColors);
  }

  // rerender on change in store data
  useEffect(() => {
    // Fns inside use effect to prevent rerender when called
    // handle click on map region
    const handleClick = (regionId: string) => {
      dispatch(addSearchArea(regionId));
      setSelectedRegion(regionId);
    };

    // handle hover on region
    const handleMouseOver = (path: SVGPathElement) => {
      if (hoveredRegion !== path.id) {
        setHoveredRegion(path.id);
      }
    };

    const handleMouseLeave = () => {
      if (hoveredRegion !== null) {
        setHoveredRegion(null);
      }
    };

    // use ref to get paths from rendered svg element to save editing svg manually
    const svg: null | SVGElement = svgRef.current;
    if (svg) {
      // create an array of paths in the document
      const paths = Array.from(svg.querySelectorAll('path'));

      if (regionalData?.regions && svgColors && lightSvgColors) {
        // edit svg path styles
        paths.forEach((path) => {
          const regionId = path.id;
          // change fill colour if hovered
          const fillColor =
            hoveredRegion === regionId || selectedRegion === regionId
              ? lightSvgColors![regionId]
              : svgColors![regionId];
          // change border colour if selected
          const strokeColor =
            selectedRegion === regionId ? theme.palette.text.primary : '';
          path.style.fill = fillColor ?? 'grey';
          path.style.stroke = strokeColor;
          path.style.strokeWidth = '0.75px';
          path.onclick = () => handleClick(regionId);
          path.onmouseover = () => handleMouseOver(path);
          path.onmouseleave = () => handleMouseLeave();
          path.role = 'button';
        });
      }
    }
  }, [
    svgRef,
    regionalData,
    hoveredRegion,
    dispatch,
    lightSvgColors,
    svgColors,
    selectedRegion,
    theme.palette.grey,
    theme.palette.text.primary,
  ]);

  return (
    <Paper
      component="article"
      sx={{
        p: 2,

        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" component="h2">
        Regional Map
      </Typography>
      <Typography variant="h6" component="h3">
        Area: {hoveredRegion}
      </Typography>
      <Typography variant="body1" component="p">
        Click map region to see intensity forecast.
      </Typography>
      <Box
        className="mapContainer"
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 1,
          padding: 2,
          borderRadius: 0.5,
          border: 'solid 1px',
          borderColor: theme.palette.grey[400],
        }}
      >
        {regionalDataState === 'loading' && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CircularIndeterminate />
          </Box>
        )}
        <RegionalMapImage svgRef={svgRef} />
        {regionalErrorState && (
          <Typography>API error: {regionalErrorState}</Typography>
        )}
      </Box>

      {/* <BasicPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl} /> */}
    </Paper>
  );
}

export default RegionalMap;
