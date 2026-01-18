import React, { useState, useCallback, useMemo } from 'react';
import styles from './styles/App.module.css';
import Header from './components/Header';
import ProjectForm from './components/ProjectForm';
import SearchBar from './components/SearchBar';
import ProjectList from './components/ProjectList';

/**
 * Main App Component
 * Manages the state for projects and search filtering
 * Demonstrates proper state management at the nearest parent component
 */
function App() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform built with React and Node.js featuring a dynamic shopping cart and payment integration.',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1460925895917-aae19106c48f?w=500&h=300&fit=crop',
      link: 'https://example.com/ecommerce',
    },
    {
      id: 2,
      title: 'Mobile App Design',
      description: 'UI/UX design for a fitness tracking mobile application with an intuitive interface and smooth user experience.',
      category: 'Design',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
      link: 'https://example.com/mobile',
    },
    {
      id: 3,
      title: 'Brand Identity Redesign',
      description: 'Complete brand identity overhaul including logo design, color palette, and marketing materials for a tech startup.',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
      link: 'https://example.com/branding',
    },
    {
      id: 4,
      title: 'Data Analytics Dashboard',
      description: 'Interactive dashboard for real-time data visualization and business intelligence analysis.',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
      link: 'https://example.com/dashboard',
    },
    {
      id: 5,
      title: 'Social Media Campaign',
      description: 'Creative social media marketing campaign that increased engagement by 250% across all platforms.',
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1460925895917-aae19106c48f?w=500&h=300&fit=crop',
      link: 'https://example.com/campaign',
    },
    {
      id: 6,
      title: 'Video Production',
      description: 'Professional video production for product launch featuring cinematic storytelling and high-quality cinematography.',
      category: 'Video',
      image: 'https://images.unsplash.com/photo-1533928298208-27ff66555d0d?w=500&h=300&fit=crop',
      link: 'https://example.com/video',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  /**
   * Handle adding a new project
   * Uses useCallback to memoize and prevent unnecessary re-renders
   */
  const handleAddProject = useCallback((newProject) => {
    const projectWithId = {
      ...newProject,
      id: Math.max(...projects.map(p => p.id), 0) + 1,
    };
    setProjects(prevProjects => [projectWithId, ...prevProjects]);
  }, [projects]);

  /**
   * Handle search input changes
   * Uses useCallback to memoize the function
   */
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  /**
   * Filter projects based on search term
   * Uses useMemo to prevent unnecessary filtering on every render
   */
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const searchLower = searchTerm.toLowerCase();
      return (
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.category.toLowerCase().includes(searchLower)
      );
    });
  }, [projects, searchTerm]);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Add New Project</h2>
            <ProjectForm onAddProject={handleAddProject} />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Search Projects</h2>
            <SearchBar value={searchTerm} onChange={handleSearch} />
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Portfolio
              {searchTerm && ` - Results for "${searchTerm}"`}
            </h2>
            <ProjectList projects={filteredProjects} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
