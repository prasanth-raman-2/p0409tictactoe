import { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export function useTheme(defaultTheme = 'light') {
  /**
   * Manage theme across the app by setting data-theme on the documentElement.
   * Returns { theme, toggleTheme }.
   */
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme, setTheme };
}
