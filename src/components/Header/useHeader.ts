import { useTheme } from '../../Context/ThemeContext'
import SearchIcon from "../../assets/icons/search.svg";
import SearchLightIcon from "../../assets/icons/search-light.svg";
import { ETheme } from '../../types/theme';
import classNames from '../../utilities/classNames';
import MoonIcon from "../../assets/icons/moon.svg";
import SunIcon from "../../assets/icons/sun.svg";

import styles from "./styles.module.scss";


const useHeader = () => {
    const { theme } = useTheme();

    const searchIcon = theme === ETheme.LIGHT ? SearchIcon : SearchLightIcon;
    const themeToggleIcon = theme === ETheme.LIGHT ? MoonIcon : SunIcon;

    const headerTitleClasses = classNames(styles.title, {
        [styles.titleLight]: theme === ETheme.LIGHT,
        [styles.titleDark]: theme === ETheme.DARK,
      });

    return {
        searchIcon,
        themeToggleIcon,
        headerTitleClasses,
    }
}

export default useHeader;