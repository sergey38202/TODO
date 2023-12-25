import { useTheme } from '../../Context/ThemeContext'
import { ETheme } from '../../types/theme';
import EmptyLightIcon from "../../assets/icons/empty-light.svg";
import EmptyDarkIcon from "../../assets/icons/empty-dark.svg";
import classNames from '../../utilities/classNames';

import styles from "./styles.module.scss";


const useTodos = () => {
    const { theme } = useTheme();

    const emptyIcon = theme === ETheme.LIGHT ? EmptyLightIcon : EmptyDarkIcon;
    
    const emptyTitleClasses = classNames(styles.emptyTitle, {
        [styles.lightEmptyTitle]: theme === ETheme.LIGHT,
        [styles.darkEmptyTitle]: theme === ETheme.DARK,
    });

    return {
        emptyIcon,
        emptyTitleClasses,
    }
}

export default useTodos;