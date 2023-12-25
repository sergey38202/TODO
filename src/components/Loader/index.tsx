import { FC } from 'react';
import { ILoaderProps } from './types';

import styles from "./styles.module.scss";
import classNames from '../../utilities/classNames';

const Loader: FC<ILoaderProps> = (props) => {
    const { size = 'large' } = props;

    return (
        <div className={classNames(styles.Loader, styles[size])} />
    );
}

export default Loader;