import {
  Data,
  Region,
  RegionalForecastState,
} from '../../types/RegionalForecast.types';

export interface ForecastDataItem {
  from: string;
  to: string;
  forecast: Region;
  plugIn?: boolean;
  unPlug?: boolean;
}

export interface StructureForcecastFnReturn {
  values: (ForecastDataItem | null)[];
  location: string;
}
const structureForecastFn = ({
  forecastState,
}: {
  forecastState: RegionalForecastState;
}): StructureForcecastFnReturn => {
  // destructure state
  const {
    searchArea: { regionName },
    regionData: { data: forecastData },
    status,
  } = forecastState;

  // get region that forecastis to be shown for
  // this can come after once regional array is created.
  // would be better to map and return selections based on region id not array poso

  // Forecast data has an arrray of regional data for all regions every 30 mins.

  // set card array to allow for loading spinners to show
  let cardData: (ForecastDataItem | null)[] = new Array(12).fill(null);

  let location: string = 'Nationwide average';

  // check store status and forecast data avaialble
  if (status === 'loaded' && forecastData) {
    // manipulate forecast data to easier to use state for card componenents in an object
    // clone to avoid read only properties
    const clonedForecastData: Data[] = JSON.parse(JSON.stringify(forecastData));

    const datetime = new Date(clonedForecastData[0].from);
    const mins = datetime.getMinutes();

    let isHour = true;

    // if in second half hour of the hour update the first half hour slot to show the hour. (mins = 0)
    if (mins > 0) {
      const updateTime = clonedForecastData[0].from.replace('30Z', '00Z');
      clonedForecastData[0].from = updateTime;
      isHour = false;
    }
    cardData = clonedForecastData
      // get hour slots from the existing data - to be refined
      // ensure data is always returned for hour slots (not 30mins

      .filter((_, i) => {
        if (isHour) {
          // return even indexs
          return i % 2 === 0;
        }
        // return first half hour (for this hour) and then odd indexs for remaining hours
        return i === 0 || i % 2 !== 0;
      })

      // get specific regional data from the forecast data for the region defined in the search area.
      .map((hourDataGB) => {
        const regionData = hourDataGB.regions.filter((region) => {
          return region.shortname === regionName;
        });

        const { regions, ...rest } = hourDataGB;

        return {
          ...rest,
          forecast: regionData[0],
        };
      });

    if (cardData[0]?.forecast.shortname) {
      location = cardData[0]?.forecast.shortname;
    }

    if (location === 'GB') {
      location = 'Nationwide average';
    }
  }

  // return object for use in Forecast Carousel
  return {
    values: cardData,
    location,
  };
};

export default structureForecastFn;
