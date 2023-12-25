import { useTheme } from '../../Context/ThemeContext'
import { ETheme } from '../../types/theme';
import classNames from '../../utilities/classNames';

import styles from "./styles.module.scss";


const useInput = () => {
    const { theme } = useTheme();

    const inputClasses = classNames(styles.Input, {
        [styles.inputLight]: theme === ETheme.LIGHT,
        [styles.inputDark]: theme === ETheme.DARK,
    });

    return {
        inputClasses,
    }
}

export default useInput;