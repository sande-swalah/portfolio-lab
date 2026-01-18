import React from 'react';
import styles from '../styles/Header.module.css';

/**
 * Header Component
 * Displays the main header and branding for the portfolio showcase
 */
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Creative Agency Portfolio</h1>
          <p className={styles.subtitle}>
            Showcasing our latest projects and creative work
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
