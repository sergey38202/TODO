import { ReactNode } from 'react';

type TButtonVariant = 'primary' | 'outlined';

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    onClick?: () => void;
    variant?: TButtonVariant;
    className?: string;
}