import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  it,
  vi,
  expect,
} from 'vitest';
import moment from 'moment';

import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node';
import store from '../app/store';
import { forecastTest24hr } from '../test/forecastTest24hr';
import Home from './Home';

const latitude = 51.501364;
const longitude = -0.14189;
const postcode = 'SW1A';
const area = 'London';
const currentDateTime = moment().utc().format('YYYY-MM-DDTHH:mm[Z]');

// mock geolocation API - not a network request
vi.stubGlobal('navigator', {
  geolocation: {
    getCurrentPosition: vi.fn().mockImplementation((success) =>
      success({
        coords: {
          latitude,
          longitude,
        },
      })
    ),
  },
});

// mock APIs - use msw to intercept http requests during the test

// eslint-disable-next-line import/prefer-default-export
export const handlers = [
  // Mock the HTTP request to the postcode API using MSW
  http.get(
    `https://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}`,
    async () => {
      await delay(150);
      return HttpResponse.json(postcode);
    }
  ),
  // Mock the HTTP request to api to determine which post code is within each region
  http.get(
    `https://api.carbonintensity.org.uk/regional/postcode/${postcode}`,
    async () => {
      await delay(150);
      return HttpResponse.json(area);
    }
  ),
  // Mock the forecast api for current datetime
  // get current date time here to remove requirement to update existing code.
  http.get(
    `https://api.carbonintensity.org.uk/regional/intensity/${currentDateTime}/fw24h`,
    async () => {
      await delay(150);
      // always return same data regardless of time for testing.
      return HttpResponse.json(forecastTest24hr);
    }
  ),
];

// set up msw server
const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('Home page intergration tests', () => {
  it('renders svg', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const southEnglandRegion = screen.getByTestId('south-england-path');
    // assert
    expect(southEnglandRegion).toBeInTheDocument();
  });

  it('styles svg based on redux store data', async () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const southEnglandRegion = screen.getByTestId('south-england-path');

    // assert
    await waitFor(() => {
      expect(southEnglandRegion).toHaveStyle('fill:hsla(54, 100%, 45%, 1.0)');
    });
  });
});
