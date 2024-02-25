import { RegionalForecastState } from '../../types/RegionalForecast.types';

const structureForcecastFn = ({
  forecastState,
}: {
  forecastState: RegionalForecastState;
}) => {
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
  let cardData = new Array(12).fill('data');

  let location = '';

  // check store status and forecast data avaialble
  if (status === 'loaded' && forecastData) {
    // manipulate forecast data to easier to use state for card componenents in an object
    cardData = forecastData
      // get 12 hour slots - to be refined
      .filter((_, i) => i % 2 === 0 && i < 23)

      // get specific regional data from the forecast data
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

    location = cardData[0].forecast.shortname;

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

export default structureForcecastFn;
