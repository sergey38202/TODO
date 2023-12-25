import { useTheme } from '../../Context/ThemeContext';
import { ETheme } from '../../types/theme';
import classNames from '../../utilities/classNames'

import styles from "./styles.module.scss";


const useTodo = () => {
    const { theme } = useTheme();

    const todoClasses = classNames(styles.label, {
        [styles.lightLabel]: theme === ETheme.LIGHT,
        [styles.darkLabel]: theme === ETheme.DARK,
    });

    const completedClasses = classNames(styles.checked, {
        [styles.completedLight]: theme === ETheme.LIGHT,
        [styles.completedDark]: theme === ETheme.DARK,
    })

    return {
        todoClasses,
        completedClasses,
    }
}

export default useTodo;