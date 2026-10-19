"use client";

import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

/**
 * Page-level theme state. Mirrors the choice onto `<html>` (which every token
 * and the mesh canvas read) and into the cookie the server renders from.
 */
export function useTheme(initialTheme: Theme = 'light') {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    document.cookie = `hopper-theme=${theme}; path=/; max-age=31536000; samesite=lax`;
    try {
      window.localStorage.setItem('hopper-theme', theme);
    } catch {
      /* storage can be blocked; the cookie is what matters */
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}
