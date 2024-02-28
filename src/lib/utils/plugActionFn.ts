import { ForecastDataItem } from './structureForcecastFn';

const determinePlugAction = ({
  values,
}: {
  values: (ForecastDataItem | null)[];
}) => {
  const hourForecastData = values.map((hourdata) => {
    return hourdata ? hourdata.forecast.intensity.forecast : null;
  });

  // Return early if any data point is null
  if (hourForecastData.some((data) => data === null)) {
    return values;
  }
  // Checked for null so recast forecast data as numbers
  const numericForecastData = hourForecastData as number[];

  // get average value of data
  const sum = numericForecastData.reduce((total, acc) => total + acc, 0);

  const avg = sum / numericForecastData.length;

  // determine a good time to plug in
  const plugIn = numericForecastData.map((data, index) => {
    const plugInArr = [];
    for (let i = 1; i < 4; i += 1) {
      if (data > numericForecastData[index + i] && data < avg + 30) {
        plugInArr.push(true);
      } else {
        plugInArr.push(false);
      }
    }
    return plugInArr.every((bool) => bool === true);
  });
  // only keep the first true in a row
  for (let i = plugIn.length; i > 0; i -= 1) {
    // check if previous value is true. If so set to false.
    if (plugIn[i - 1]) {
      plugIn[i] = false;
    }
  }

  // determine a good time to un plug
  const unPlug = numericForecastData.map((data, index) => {
    const unPlugArr = [];
    for (let i = 1; i < 3; i += 1) {
      if (data < numericForecastData[index + i] && data > avg - 30) {
        unPlugArr.push(true);
      } else {
        unPlugArr.push(false);
      }
    }
    return unPlugArr.every((bool) => bool === true);
  });
  // only keep the first true in a row
  for (let i = unPlug.length; i > 0; i -= 1) {
    // check if previous value is true. If so set to false.
    if (unPlug[i - 1]) {
      unPlug[i] = false;
    }
  }

  const updatedValues = values.map((hourData, index) => {
    if (hourData) {
      const temp = hourData;
      temp.plugIn = plugIn[index];
      temp.unPlug = unPlug[index];
      return hourData;
    }
    return hourData;
  });

  return updatedValues;
};

export default determinePlugAction;
