type IntensityColors = {
  [key: string]: string;
};

export const intensityColors: IntensityColors = {
  'very high': 'hsla(0, 77%, 39%, 1.0)',
  high: 'hsla(24, 100%, 47%, 1.0)',
  moderate: 'hsla(54, 100%, 71%, 1.0)',
  low: 'hsla(123, 42%, 63%, 1.0)',
  'very low': 'hsla(162, 60%, 26%, 1.0)',
};

export const svgIntensityColors = (data) => {
  const regionalData = data.regions;

  const regionIntensities = regionalData.map(
    ({ shortname, intensity: { index } }) => {
      return { [shortname]: intensityColors[index] };
    }
  );

  const regionIntensitiesObj = Object.assign({}, ...regionIntensities);

  return regionIntensitiesObj;
};
