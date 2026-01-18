import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectList from '../components/ProjectList';

describe('ProjectList Component', () => {
  const mockProjects = [
    {
      id: 1,
      title: 'Project 1',
      description: 'Description 1',
      category: 'Web Development',
      image: 'https://example.com/image1.jpg',
      link: 'https://example.com/1',
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Description 2',
      category: 'Design',
      image: 'https://example.com/image2.jpg',
      link: 'https://example.com/2',
    },
  ];

  test('renders project grid with all projects', () => {
    render(<ProjectList projects={mockProjects} />);
    
    expect(screen.getByText(/Project 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Project 2/i)).toBeInTheDocument();
  });

  test('shows empty state when projects array is empty', () => {
    render(<ProjectList projects={[]} />);
    
    expect(screen.getByText(/No projects found/i)).toBeInTheDocument();
  });

  test('shows empty state when projects is null', () => {
    render(<ProjectList projects={null} />);
    
    expect(screen.getByText(/No projects found/i)).toBeInTheDocument();
  });

  test('renders correct number of project cards', () => {
    render(<ProjectList projects={mockProjects} />);
    
    const links = screen.getAllByRole('link');
    // Each project has 2 links (View Project + Learn More)
    expect(links.length).toBe(mockProjects.length * 2);
  });
});
