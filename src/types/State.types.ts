import { AppStylesState } from './AppStyles.types';
import { RegionalForecastState } from './RegionalForecast.types';

export interface AppState {
  regionalForecast: RegionalForecastState;
  appStyles: AppStylesState;
}
