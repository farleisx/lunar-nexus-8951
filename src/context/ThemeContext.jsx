"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Defining the shape of our theme context value
const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  // State to manage the current theme, defaulting to 'dark' for Sovereign X's aesthetic
  const [theme, setTheme] = useState('dark');

  // Effect to apply the theme class to the document body
  useEffect(() => {
    // Ensuring the DOM is ready before manipulating classes
    if (document && document.documentElement) {
      document.documentElement.classList.remove('light', 'dark'); // Clean existing classes
      document.documentElement.classList.add(theme); // Apply the current theme
    }
  }, [theme]); // Re-run when theme changes

  // Function to toggle between 'light' and 'dark' themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // Memoizing the context value for performance
  const contextValue = React.useMemo(() => ({ theme, toggleTheme }), [theme]);

  // Providing the theme context to children components
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to easily consume the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  // Throwing an error if useTheme is used outside of a ThemeProvider
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}