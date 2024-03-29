import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import RegionalMap from './RegionalMap';

import store from '../app/store';
import regionalForecastReducer, {
  initialForecastState,
} from '../features/slices/regionalForecastSlice';
import stylesReducer, {
  initialStylesState,
} from '../features/slices/stylesSlice';
import testStoreState from '../test/testState.json';

// test store with preloaded data to mock data for testing.
const makeTestStore = (
  preloadedState = {
    regionalForecast: initialForecastState,
    appStyles: initialStylesState,
  }
) => {
  return configureStore({
    reducer: {
      regionalForecast: regionalForecastReducer,
      // forecast: forecastReducer,
      appStyles: stylesReducer,
    },
    preloadedState,
  });
};

describe('Regional map unit tests', () => {
  it('should render an svg image', () => {
    render(
      <Provider store={store}>
        <RegionalMap />
      </Provider>
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should render dark green color for Scotland region based on state forecast data', () => {
    // render
    const testStore = makeTestStore({
      ...testStoreState,
    });
    render(
      <Provider store={testStore}>
        <RegionalMap />
      </Provider>
    );
    // assert
    const scotlandRegion = screen.getByTestId('south-scotland-path');
    expect(scotlandRegion).toHaveStyle('fill:hsla(162, 60%, 26%, 1.0)');
  });

  it('should render orange color for South West England region based on state forecast data', () => {
    // render
    const testStore = makeTestStore({
      ...testStoreState,
    });
    render(
      <Provider store={testStore}>
        <RegionalMap />
      </Provider>
    );
    // assert
    const southWestRegion = screen.getByTestId('south-west-england-path');
    expect(southWestRegion).toHaveStyle('fill:hsla(24, 100%, 47%, 1.0)');
  });

  it('should render yellow color for South England region based on state forecast data', () => {
    // render
    const testStore = makeTestStore({
      ...testStoreState,
    });
    render(
      <Provider store={testStore}>
        <RegionalMap />
      </Provider>
    );
    // assert
    const southEnglandRegion = screen.getByTestId('south-england-path');
    expect(southEnglandRegion).toHaveStyle('fill:hsla(54, 100%, 45%, 1.0)');
  });
});
