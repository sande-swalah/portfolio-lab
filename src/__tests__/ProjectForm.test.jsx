import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectForm from '../components/ProjectForm';

describe('ProjectForm Component', () => {
  test('renders form with all required fields', () => {
    const mockOnAddProject = jest.fn();
    render(<ProjectForm onAddProject={mockOnAddProject} />);
    
    expect(screen.getByLabelText(/Project Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Project Link/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Project/i)).toBeInTheDocument();
  });

  test('calls onAddProject with correct data on valid submission', async () => {
    const mockOnAddProject = jest.fn();
    render(<ProjectForm onAddProject={mockOnAddProject} />);
    
    const titleInput = screen.getByPlaceholderText(/Enter project title/i);
    const descriptionInput = screen.getByPlaceholderText(/Enter project description/i);
    const linkInput = screen.getByPlaceholderText(/https:\/\/example.com/i);
    const submitButton = screen.getByText(/Add Project/i);
    
    await userEvent.type(titleInput, 'Test Project');
    await userEvent.type(descriptionInput, 'This is a valid test project');
    await userEvent.type(linkInput, 'https://example.com');
    await userEvent.click(submitButton);
    
    expect(mockOnAddProject).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Test Project',
        description: 'This is a valid test project',
        link: 'https://example.com',
      })
    );
  });

  test('shows error for empty title', async () => {
    const mockOnAddProject = jest.fn();
    render(<ProjectForm onAddProject={mockOnAddProject} />);
    
    const submitButton = screen.getByText(/Add Project/i);
    await userEvent.click(submitButton);
    
    expect(screen.getByText(/Project title is required/i)).toBeInTheDocument();
    expect(mockOnAddProject).not.toHaveBeenCalled();
  });

  test('shows error for short description', async () => {
    const mockOnAddProject = jest.fn();
    render(<ProjectForm onAddProject={mockOnAddProject} />);
    
    const titleInput = screen.getByPlaceholderText(/Enter project title/i);
    const descriptionInput = screen.getByPlaceholderText(/Enter project description/i);
    const submitButton = screen.getByText(/Add Project/i);
    
    await userEvent.type(titleInput, 'Test');
    await userEvent.type(descriptionInput, 'Short');
    await userEvent.click(submitButton);
    
    expect(screen.getByText(/Description must be at least 10 characters/i)).toBeInTheDocument();
  });

  test('shows error for empty link', async () => {
    const mockOnAddProject = jest.fn();
    render(<ProjectForm onAddProject={mockOnAddProject} />);
    
    const titleInput = screen.getByPlaceholderText(/Enter project title/i);
    const descriptionInput = screen.getByPlaceholderText(/Enter project description/i);
    const submitButton = screen.getByText(/Add Project/i);
    
    await userEvent.type(titleInput, 'Test Project');
    await userEvent.type(descriptionInput, 'This is a valid description');
    await userEvent.click(submitButton);
    
    expect(screen.getByText(/Project link is required/i)).toBeInTheDocument();
  });

  test('shows validation errors on form submission', async () => {
    const mockOnAddProject = jest.fn();
    render(<ProjectForm onAddProject={mockOnAddProject} />);
    
    const submitButton = screen.getByText(/Add Project/i);
    await userEvent.click(submitButton);
    
    // Check for validation errors
    expect(screen.getByText(/Project title is required/i)).toBeInTheDocument();
    expect(mockOnAddProject).not.toHaveBeenCalled();
  });

  test('displays all category options', () => {
    const mockOnAddProject = jest.fn();
    render(<ProjectForm onAddProject={mockOnAddProject} />);
    
    const categorySelect = screen.getByLabelText(/Category/i);
    expect(categorySelect).toBeInTheDocument();
    
    const options = categorySelect.querySelectorAll('option');
    expect(options.length).toBeGreaterThan(1);
  });

  test('clears error when user starts typing', async () => {
    const mockOnAddProject = jest.fn();
    render(<ProjectForm onAddProject={mockOnAddProject} />);
    
    const submitButton = screen.getByText(/Add Project/i);
    await userEvent.click(submitButton);
    
    expect(screen.getByText(/Project title is required/i)).toBeInTheDocument();
    
    const titleInput = screen.getByPlaceholderText(/Enter project title/i);
    await userEvent.type(titleInput, 'Test');
    
    expect(screen.queryByText(/Project title is required/i)).not.toBeInTheDocument();
  });

  test('resets form after successful submission', async () => {
    const mockOnAddProject = jest.fn();
    render(<ProjectForm onAddProject={mockOnAddProject} />);
    
    const titleInput = screen.getByPlaceholderText(/Enter project title/i);
    const descriptionInput = screen.getByPlaceholderText(/Enter project description/i);
    const linkInput = screen.getByPlaceholderText(/https:\/\/example.com/i);
    const submitButton = screen.getByText(/Add Project/i);
    
    await userEvent.type(titleInput, 'Test Project');
    await userEvent.type(descriptionInput, 'This is a valid description');
    await userEvent.type(linkInput, 'https://example.com');
    await userEvent.click(submitButton);
    
    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
    expect(linkInput.value).toBe('');
  });
});
