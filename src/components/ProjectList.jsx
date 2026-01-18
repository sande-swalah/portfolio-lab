import React from 'react';
import styles from '../styles/ProjectList.module.css';
import ProjectCard from './ProjectCard';

/**
 * ProjectList Component
 * Displays a grid of project cards
 * Demonstrates component composition and props passing
 */
function ProjectList({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyMessage}>
          No projects found. Try adjusting your search or add a new project!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.projectGrid}>
      {projects.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default ProjectList;
