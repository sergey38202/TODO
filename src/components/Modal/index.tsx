import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import styles from "./styles.module.scss";
import { IModalProps } from './types';
import Button from '../Button';
import useModal from './useModal';

export default function Modal(props: IModalProps) {
  const { open, title, onClose, onComplete, children, controllers, allowOutsideClick } = props;
  const modalRef = useRef<HTMLDivElement>(null);
  const { modalClasses, titleClasses } = useModal();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (allowOutsideClick && modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [open, onClose, allowOutsideClick]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} />
      <div className={modalClasses} ref={modalRef}>
        <div className={titleClasses}>{title}</div>
        <div className={styles.childrenWrapper}>{children}</div>
        <div className={styles.btnWrapper}>
          <Button onClick={onClose} variant="outlined">
            {controllers?.closeBtn}
          </Button>
          <Button onClick={onComplete}>
            {controllers?.completeBtn}
          </Button>
        </div>
      </div>
    </>,
    document.getElementById('portal')!
  );
}
