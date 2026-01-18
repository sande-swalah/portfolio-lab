import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Component', () => {
  test('renders the app with header and sections', () => {
    render(<App />);
    expect(screen.getByText(/Creative Agency Portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/Add New Project/i)).toBeInTheDocument();
    expect(screen.getByText(/Search Projects/i)).toBeInTheDocument();
  });

  test('displays initial projects', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /E-Commerce Platform/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Mobile App Design/i })).toBeInTheDocument();
  });

  test('filters projects based on search term', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search by project/i);
    
    await userEvent.type(searchInput, 'E-Commerce');
    
    expect(screen.getByRole('heading', { name: /E-Commerce Platform/i })).toBeInTheDocument();
  });

  test('clears search when clear button is clicked', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search by project/i);
    
    await userEvent.type(searchInput, 'E-Commerce');
    const clearButton = screen.getByLabelText(/Clear search/i);
    
    await userEvent.click(clearButton);
    
    expect(searchInput.value).toBe('');
  });

  test('adds a new project when form is submitted', async () => {
    render(<App />);
    
    const titleInput = screen.getByPlaceholderText(/Enter project title/i);
    const descriptionInput = screen.getByPlaceholderText(/Enter project description/i);
    const linkInput = screen.getByPlaceholderText(/https:\/\/example.com/i);
    const submitButton = screen.getByText(/Add Project/i);
    
    await userEvent.type(titleInput, 'New Amazing Project');
    await userEvent.type(descriptionInput, 'This is a new and amazing project');
    await userEvent.type(linkInput, 'https://example.com/new-project');
    
    await userEvent.click(submitButton);
    
    expect(screen.getByRole('heading', { name: /New Amazing Project/i })).toBeInTheDocument();
  });

  test('does not add project with empty fields', async () => {
    render(<App />);
    const submitButton = screen.getByText(/Add Project/i);
    
    await userEvent.click(submitButton);
    
    expect(screen.getByText(/Project title is required/i)).toBeInTheDocument();
  });

  test('shows empty state when no projects match search', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search by project/i);
    
    await userEvent.type(searchInput, 'NonexistentProject123');
    
    expect(screen.getByText(/No projects found/i)).toBeInTheDocument();
  });

  test('searches by category', async () => {
    render(<App />);
    const searchInput = screen.getByPlaceholderText(/Search by project/i);
    
    await userEvent.type(searchInput, 'Branding');
    
    expect(screen.getByRole('heading', { name: /Brand Identity Redesign/i })).toBeInTheDocument();
  });

  test('form validation shows error for short description', async () => {
    render(<App />);
    
    const titleInput = screen.getByPlaceholderText(/Enter project title/i);
    const descriptionInput = screen.getByPlaceholderText(/Enter project description/i);
    const linkInput = screen.getByPlaceholderText(/https:\/\/example.com/i);
    const submitButton = screen.getByText(/Add Project/i);
    
    await userEvent.type(titleInput, 'Test');
    await userEvent.type(descriptionInput, 'Short');
    await userEvent.type(linkInput, 'https://example.com');
    
    await userEvent.click(submitButton);
    
    expect(screen.getByText(/Description must be at least 10 characters/i)).toBeInTheDocument();
  });

  test('clears form after successful submission', async () => {
    render(<App />);
    
    const titleInput = screen.getByPlaceholderText(/Enter project title/i);
    const descriptionInput = screen.getByPlaceholderText(/Enter project description/i);
    const linkInput = screen.getByPlaceholderText(/https:\/\/example.com/i);
    const submitButton = screen.getByText(/Add Project/i);
    
    await userEvent.type(titleInput, 'New Project');
    await userEvent.type(descriptionInput, 'This is a new project');
    await userEvent.type(linkInput, 'https://example.com');
    
    await userEvent.click(submitButton);
    
    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
    expect(linkInput.value).toBe('');
  });
});
