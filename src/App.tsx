import { useEffect } from 'react';

import Main from './pages/Main';

import { useTheme } from './Context/ThemeContext';
import { ETheme } from './types/theme';
import { THEME_KEY } from './constants/localStorageKeyCodes';

import styles from "./App.module.scss";

function App() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!localStorage.getItem(THEME_KEY)) {
      setTheme(ETheme.LIGHT);
    }
  }, [setTheme]);

  useEffect(() => {
    document.body.classList.toggle(styles.dark, theme === ETheme.DARK);
  }, [theme]);

  return (
    <div className={styles.App}>
      <Main />
    </div>
  )
}

export default App
