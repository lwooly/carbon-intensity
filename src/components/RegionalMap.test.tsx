import { render, screen } from '@testing-library/react';
import { describe, it, expect, assert } from 'vitest';
import { Provider, useDispatch } from 'react-redux';

import RegionalMap from './RegionalMap';
import store from '../app/store';

describe('Regional map unit tests', () => {
  it('should render an svg image', () => {
    render(
      <Provider store={store}>
        <RegionalMap />
      </Provider>
    );
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should render correct colors for Scotland region based on state forecast data', () => {
    //render
    render(
      <Provider store={store}>
        <RegionalMap />
      </Provider>
    );

    //act - dispatch actions to the store
    // 1. set post code
    store.dispatch()

    // 2. set forecast data
    //assert
    const scotlandRegion = screen.getByTestId('south-scotland-path');
    console.log(scotlandRegion)
    expect(scotlandRegion).toHaveStyle('fill:hsla(162, 60%, 26%, 1.0)')
  });
});
