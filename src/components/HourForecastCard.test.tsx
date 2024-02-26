import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HourForecastCard from './HourForecastCard';

describe('Hour Forecast Card Unit tests', () => {
  // mock forecast values passed to card
  const mockForecastValue = {
    from: '2023-11-02T21:30Z',
    to: '2023-11-02T22:00Z',
    forecast: {
      regionid: 11,
      dnoregion: 'WPD South West',
      shortname: 'South West England',
      intensity: {
        forecast: 338,
        index: 'very high',
      },
      generationmix: [
        {
          fuel: 'biomass',
          perc: 0.1,
        },
        {
          fuel: 'coal',
          perc: 0,
        },
        {
          fuel: 'imports',
          perc: 0.2,
        },
        {
          fuel: 'gas',
          perc: 85.8,
        },
        {
          fuel: 'nuclear',
          perc: 0.1,
        },
        {
          fuel: 'other',
          perc: 0,
        },
        {
          fuel: 'hydro',
          perc: 0,
        },
        {
          fuel: 'solar',
          perc: 0,
        },
        {
          fuel: 'wind',
          perc: 13.9,
        },
      ],
    },
  };

  const loadedStatus = 'loaded';

  it('should show a time', () => {
    // render
    render(
      <HourForecastCard
        values={mockForecastValue}
        status={loadedStatus}
        handleClick={() => {}}
      />
    );
    // act
    // assert
    const timeElement = screen.getByText('09:30 PM');
    expect(timeElement).toBeInTheDocument();
  });

  it('should show a time', () => {
    // render
    render(
      <HourForecastCard
        values={mockForecastValue}
        status={loadedStatus}
        handleClick={() => {}}
      />
    );
    // act
    // assert
    const timeElement = screen.getByText('09:30 PM');
    expect(timeElement).toBeInTheDocument();
  });

  it('should show a forecast index', () => {
    // render
    render(
      <HourForecastCard
        values={mockForecastValue}
        status={loadedStatus}
        handleClick={() => {}}
      />
    );
    const indexElement = screen.getByText(/VERY HIGH/);
    // assert
    expect(indexElement).toBeInTheDocument();
  });

  it('should show a forecast', () => {
    // render
    render(
      <HourForecastCard
        values={mockForecastValue}
        status={loadedStatus}
        handleClick={() => {}}
      />
    );
    const forecastElement = screen.getByText(/338/);
    // assert
    expect(forecastElement).toBeInTheDocument();
  });

  it(`should have a background bar div width of to show intensity graphically `, () => {
    render(
      <HourForecastCard
        values={mockForecastValue}
        status={loadedStatus}
        handleClick={() => {}}
      />
    );
    // assert
    const indexBar = screen.getByTestId('index-bar');
    expect(indexBar).toBeInTheDocument();
  });

  it('should render loading spinner prior to content loads', () => {
    render(
      <HourForecastCard
        values={mockForecastValue}
        status="loading"
        handleClick={() => {}}
      />
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});
