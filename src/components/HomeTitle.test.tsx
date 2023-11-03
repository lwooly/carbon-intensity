/* eslint-disable import/no-extraneous-dependencies */
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Provider } from 'react-redux';
import HomeTitle from './HomeTitle';
import store from '../app/store';


describe('HomeTitle unit tests', () => {
  it('renders title', () => {
    // render
    render(
      <Provider store={store}>
        <HomeTitle />
      </Provider>
    );
    // act
    // assert
    const title = screen.getByRole('heading', {
      level: 1,
    });
    expect(title).toHaveTextContent('Sustainable choices through insight...');
  });

  it('renders title summary description', () => {
    // render
    render(
      <Provider store={store}>
        <HomeTitle />
      </Provider>
    );
    // act
    // assert
    expect(screen.getByText(/Welcome to our dashboard/)).toBeInTheDocument();
  });
});
