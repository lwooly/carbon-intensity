import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it, vi } from 'vitest';
import { Home } from '@mui/icons-material';
import { http, HttpResponse, delay } from 'msw';
import { setupServer } from 'msw/node'
import store from '../app/store';

const latitude = 51.501364;
const longitude = -0.14189;

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
      return HttpResponse.json('SW1A');
    }
  ),
];

//set up msw server
const server = setupServer(...handlers

)

describe('Home page intergration tests', () => {
  it('updates store and renders forcast widget correctly', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );
  });
});
