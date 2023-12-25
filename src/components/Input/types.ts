import { ChangeEvent, InputHTMLAttributes } from 'react';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    value?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    icon?: string;
    iconAlt?: string;
    placeholder: string;
}
