import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import App from './App';
import store from './app/store';

describe('App', () => {
  describe('Home page', () => {
    describe('Title', () => {
      it('Home page renders title', async () => {
        // Act
        await act(() => {
          // Arrange
          render(
            <Provider store={store}>
              <MemoryRouter initialEntries={['/']}>
                <App />
              </MemoryRouter>
            </Provider>
          );
        });
        // Expect
        const title = screen.getByRole('heading', {
          level: 1,
        });

        expect(title).toHaveTextContent(
          'Sustainable choices through insight...'
        );
      });
    });

    it('Renders Not Found if invalid path', () => {
      // Arrange
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/badRoute']}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      // Act

      // Assert
      const heading = screen.getByRole('heading', {
        level: 1,
      });
      expect(heading).toHaveTextContent('Page not found');
    });
  });
});
