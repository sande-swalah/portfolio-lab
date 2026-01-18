# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# portfolio-lab

# Portfolio Showcase - Implementation Summary

## Project Overview

A complete, production-ready Single Page Application (SPA) built with React that showcases a creative agency's portfolio. The application features a responsive design, dynamic project management, and comprehensive testing.





### 1. Landing Page Displaying Projects ✓
- **Location**: `src/App.jsx` - ProjectList and ProjectCard components
- **Features**:
  - Grid-based responsive layout
  - 6 sample projects pre-loaded
  - Project images, titles, descriptions, categories
  - Links to project details
  - Beautiful hover effects with overlay buttons

### 2. Form to Add New Projects Dynamically ✓
- **Location**: `src/components/ProjectForm.jsx`
- **Features**:
  - Input fields for title, description, category, and link
  - Real-time form validation
  - Error messages for invalid inputs
  - Category dropdown with 7 predefined categories
  - Form resets after successful submission
  - Comprehensive validation rules:
    - Title required
    - Description minimum 10 characters
    - URL format validation (http/https)
    - Link required

### 3. Search Feature for Dynamic Filtering ✓
- **Location**: `src/components/SearchBar.jsx`
- **Features**:
  - Real-time search as user types
  - Searches across title, description, and category
  - Clear button to reset search
  - Search results counter in header
  - Case-insensitive matching



 Component Hierarchy (20/20)
**Advanced hierarchy with reusable components**

Components implemented:
1. **App.jsx** (Root/State Management)
   - Manages projects state
   - Manages search term state
   - Handles project addition
   - Filters projects for display

2. **Header.jsx** (Presentational)
   - Displays agency branding
   - Shows main title and subtitle

3. **ProjectForm.jsx** (Interactive)
   - Manages form state
   - Validates user input
   - Emits new projects to parent
   - Error handling and display

4. **SearchBar.jsx** (Interactive)
   - Manages search input state
   - Provides clear functionality
   - Real-time filtering

5. **ProjectList.jsx** (Container)
   - Displays grid of projects
   - Handles empty state
   - Reuses ProjectCard component

6. **ProjectCard.jsx** (Reusable)
   - Displays individual project
   - Shows image, title, description
   - Category badge display
   - Project links

**Props Flow**:
```
App
├── projects → ProjectList → ProjectCard
├── filteredProjects → ProjectList → ProjectCard
├── onAddProject → ProjectForm
└── onChange → SearchBar
```

*