import React from 'react';
import styles from '../styles/ProjectCard.module.css';

/**
 * ProjectCard Component
 * Displays individual project information
 * Demonstrates reusable component design and prop passing
 */
function ProjectCard({ project }) {
  const {
    title,
    description,
    category,
    image,
    link,
  } = project;

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={image}
          alt={title}
          className={styles.image}
          loading="lazy"
        />
        <div className={styles.overlay}>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewButton}
          >
            View Project
          </a>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.categoryBadge}>{category}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Learn More →
        </a>
      </div>
    </article>
  );
}

export default ProjectCard;
