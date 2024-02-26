import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Paper, Typography } from '@mui/material';
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
    };

    // handle hover on region
    const handleMouseOver = (path: SVGPathElement) => {
      if (hoveredRegion !== path.id) {
        setHoveredRegion(path.id);
      }
      // console.log(event.currentTarget)
      // if (anchorEl !== event.currentTarget) {
      //   setAnchorEl(event.currentTarget);
      // }
    };

    const handleMouseLeave = () => {
      if (hoveredRegion !== null) {
        setHoveredRegion(null);
      }
      // if (anchorEl !== null) {
      //   setAnchorEl(null);
      // }
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
          const fillColor =
            hoveredRegion === regionId
              ? lightSvgColors![regionId]
              : svgColors![regionId];
          // eslint-disable-next-line no-param-reassign
          path.style.fill = fillColor ?? 'grey';
          // eslint-disable-next-line no-param-reassign
          path.onclick = () => handleClick(regionId);
          // eslint-disable-next-line no-param-reassign
          path.onmouseover = () => handleMouseOver(path);
          // eslint-disable-next-line no-param-reassign
          path.onmouseleave = () => handleMouseLeave();
          // eslint-disable-next-line no-param-reassign
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
  ]);

  return (
    <Paper
      component="article"
      sx={{
        p: 5,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
