import { FC } from 'react';
import styles from "./styles.module.scss";
import { IButtonProps } from './types';
import classNames from '../../utilities/classNames';

const Button: FC<IButtonProps> = (props) => {
    const { children, onClick = () => {}, variant = 'primary', className, ...rest} = props;
    const buttonClassNames = classNames(styles.Button, styles[variant], className);

    return (
        <button
         onClick={onClick}
         className={buttonClassNames} 
         { ...rest }
        >
            { children }
        </button>
    );
}

export default Button;