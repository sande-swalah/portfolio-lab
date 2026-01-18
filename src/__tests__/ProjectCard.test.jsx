import React from 'react';
import { render, screen } from '@testing-library/react';
import ProjectCard from '../components/ProjectCard';

describe('ProjectCard Component', () => {
  const mockProject = {
    id: 1,
    title: 'Test Project',
    description: 'This is a test project description',
    category: 'Web Development',
    image: 'https://example.com/image.jpg',
    link: 'https://example.com',
  };

  test('renders project card with all information', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(/Test Project/i);
    expect(screen.getByText(/This is a test project description/i)).toBeInTheDocument();
    expect(screen.getByText(/Web Development/i)).toBeInTheDocument();
  });

  test('renders project image with correct alt text', () => {
    render(<ProjectCard project={mockProject} />);
    
    const image = screen.getByAltText(/Test Project/i);
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  test('renders links with correct href', () => {
    render(<ProjectCard project={mockProject} />);
    
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', 'https://example.com');
    expect(links[1]).toHaveAttribute('href', 'https://example.com');
  });

  test('links open in new tab', () => {
    render(<ProjectCard project={mockProject} />);
    
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  test('renders "Learn More" button text', () => {
    render(<ProjectCard project={mockProject} />);
    
    const learnMoreLinks = screen.getAllByRole('link');
    expect(learnMoreLinks[1]).toHaveTextContent(/Learn More/i);
  });

  test('renders category badge', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Web Development')).toBeInTheDocument();
  });

  test('image has lazy loading attribute', () => {
    render(<ProjectCard project={mockProject} />);
    
    const image = screen.getByAltText(/Test Project/i);
    expect(image).toHaveAttribute('loading', 'lazy');
  });
});
