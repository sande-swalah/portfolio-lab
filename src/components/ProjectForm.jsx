import React, { useState } from 'react';
import styles from '../styles/ProjectForm.module.css';

/**
 * ProjectForm Component
 * Handles the form for adding new projects
 * Demonstrates event handling and state management
 */
function ProjectForm({ onAddProject }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1460925895917-aae19106c48f?w=500&h=300&fit=crop',
    link: '',
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Web Development',
    'Design',
    'Branding',
    'Marketing',
    'Video',
    'Photography',
    'Consulting',
  ];

  /**
   * Handle form input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  /**
   * Validate form data
   */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    }

    if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.link.trim()) {
      newErrors.link = 'Project link is required';
    } else if (!/^https?:\/\//.test(formData.link)) {
      newErrors.link = 'Link must start with http:// or https://';
    }

    return newErrors;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddProject(formData);

    // Reset form
    setFormData({
      title: '',
      description: '',
      category: 'Web Development',
      image: 'https://images.unsplash.com/photo-1460925895917-aae19106c48f?w=500&h=300&fit=crop',
      link: '',
    });
    setErrors({});
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Project Title <span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter project title"
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
        />
        {errors.title && <span className={styles.error}>{errors.title}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          Description <span className={styles.required}>*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter project description"
          rows="4"
          className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
        />
        {errors.description && <span className={styles.error}>{errors.description}</span>}
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={styles.select}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="link" className={styles.label}>
            Project Link <span className={styles.required}>*</span>
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://example.com"
            className={`${styles.input} ${errors.link ? styles.inputError : ''}`}
          />
          {errors.link && <span className={styles.error}>{errors.link}</span>}
        </div>
      </div>

      <button type="submit" className={styles.button}>
        Add Project
      </button>
    </form>
  );
}

export default ProjectForm;
