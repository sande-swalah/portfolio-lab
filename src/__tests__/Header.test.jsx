import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header Component', () => {
  test('renders header with title and subtitle', () => {
    render(<Header />);
    
    expect(screen.getByText(/Creative Agency Portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/Showcasing our latest projects and creative work/i)).toBeInTheDocument();
  });

  test('header has proper heading structure', () => {
    render(<Header />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Creative Agency Portfolio/i);
  });
});
