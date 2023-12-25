import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { THEME_KEY } from '../constants/localStorageKeyCodes';
import { ETheme } from '../types/theme';

interface IThemeContextValues {
  theme: ETheme;
  setTheme: (theme: ETheme) => void;
}

interface IThemeProvider {
    children: ReactNode;
}

export const ThemeContext = createContext<IThemeContextValues>({
  theme: ETheme.LIGHT,
  setTheme: () => {},
});

export const ThemeProvider: React.FC<IThemeProvider> = ({ children }) => {
  const storedTheme = localStorage.getItem(THEME_KEY);
  const initialTheme: ETheme = storedTheme ? (storedTheme as ETheme) : ETheme.LIGHT;

  const [theme, setTheme] = useState<ETheme>(initialTheme);

  const handleSetTheme = (newTheme: ETheme) => {
    setTheme(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme && storedTheme !== theme) {
      setTheme(storedTheme as ETheme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
