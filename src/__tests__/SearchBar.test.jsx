import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

describe('SearchBar Component', () => {
  test('renders search input and icon', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    
    expect(screen.getByPlaceholderText(/Search by project/i)).toBeInTheDocument();
    expect(screen.getByText(/🔍/)).toBeInTheDocument();
  });

  test('calls onChange when input value changes', async () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText(/Search by project/i);
    await userEvent.type(input, 'test');
    
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith('t');
  });

  test('displays clear button when value is not empty', () => {
    render(<SearchBar value="test" onChange={() => {}} />);
    
    expect(screen.getByLabelText(/Clear search/i)).toBeInTheDocument();
  });

  test('does not display clear button when value is empty', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    
    expect(screen.queryByLabelText(/Clear search/i)).not.toBeInTheDocument();
  });

  test('calls onChange with empty string when clear button is clicked', async () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="test" onChange={mockOnChange} />);
    
    const clearButton = screen.getByLabelText(/Clear search/i);
    await userEvent.click(clearButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  test('input shows current value', () => {
    render(<SearchBar value="React" onChange={() => {}} />);
    
    const input = screen.getByPlaceholderText(/Search by project/i);
    expect(input.value).toBe('React');
  });
});
