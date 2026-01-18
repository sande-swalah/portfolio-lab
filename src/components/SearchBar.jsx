import React from 'react';
import styles from '../styles/SearchBar.module.css';

/**
 * SearchBar Component
 * Handles search input for filtering projects
 * Demonstrates passing props and event handling
 */
function SearchBar({ value, onChange }) {
  /**
   * Handle search input change
   */
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  /**
   * Handle clear search
   */
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search by project name, description, or category..."
          value={value}
          onChange={handleInputChange}
          aria-label="Search projects"
        />
        {value && (
          <button
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
            title="Clear search"
          >
            ✕
          </button>
        )}
        <span className={styles.searchIcon}>🔍</span>
      </div>
    </div>
  );
}

export default SearchBar;
