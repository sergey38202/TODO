import { useTheme } from '../../Context/ThemeContext'
import { ETheme } from '../../types/theme';
import classNames from '../../utilities/classNames';

import styles from "./styles.module.scss";


const useModal = () => {
    const { theme } = useTheme();

    const modalClasses = classNames(styles.Modal, {
        [styles.lightModal]: theme === ETheme.LIGHT,
        [styles.darkModal]: theme === ETheme.DARK,
    });

    const titleClasses = classNames(styles.title, {
        [styles.lightTitle]: theme === ETheme.LIGHT,
        [styles.darkTitle]: theme === ETheme.DARK,
    });
    
    return {
        modalClasses,
        titleClasses,
    }
}

export default useModal;