import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from './App';

describe('App', () => {
  it('Renders hello world', () => {
    // Arrange
    render(<App />);

    // Act
    // Expect

    const title = screen.getByTestId('title');

    expect(title).toHaveTextContent('Hello world');
  });
});
