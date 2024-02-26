import { IntensityColors } from '../../features/regionalData/regionalDataFns';

const lightenIntensityColors = (
  svgColors: IntensityColors
): IntensityColors => {
  const lightColors: IntensityColors = {};
  const tempArr = Array.from(Object.entries(svgColors));
  tempArr.forEach((keyValue) => {
    lightColors[keyValue[0]] = `${keyValue[1].slice(0, -6)}, 0.5)`;
  });

  return lightColors;
};

export default lightenIntensityColors;
