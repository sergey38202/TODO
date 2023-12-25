import { ReactNode } from 'react';

export interface IModalProps {
    open?: boolean;
    title: string;
    onClose: () => void;
    onComplete?: () => void;
    children: ReactNode;
    controllers?: {
        completeBtn?: string;
        closeBtn?: string
    };
    allowOutsideClick?: boolean;
}