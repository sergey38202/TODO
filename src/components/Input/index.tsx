import { FC } from 'react';

import { IInputProps } from "./types";
import styles from "./styles.module.scss";
import classNames from '../../utilities/classNames';
import useInput from './useInput';

const Input: FC<IInputProps> = (props) => {
    const { 
        value,
        onChange, 
        className, 
        icon, 
        iconAlt, 
        placeholder, 
        ...otherProps 
    } = props;

    const { inputClasses } = useInput();

    return (
        <div className={styles.InputWrapper}>
            <input
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              className={classNames(inputClasses, className)}
              { ...otherProps }
         />
         { icon && <img src={icon} alt={iconAlt} width={21} height={21} className={styles.icon} /> }
        </div>
    );
}

export default Input;