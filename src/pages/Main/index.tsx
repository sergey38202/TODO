import Header from '../../components/Header';
import PlusIcon from "../../assets/icons/plus.svg";

import styles from "./styles.module.scss";
import Todos from '../../components/Todos';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../store/slices/modalSlice';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import { RootState } from '../../store';
import { addTodo } from '../../store/slices/todoSlice';
import { useState } from 'react';

const Main = () => {
    const { open } = useSelector((state: RootState) => state.modal);

    const [todo, setTodo] = useState<string>('');
    const [modalError, setModalError] = useState<boolean>(false);

    const dispatch = useDispatch();

    const handleOpenModal = (e: React.MouseEvent) => {
        e.stopPropagation();
        dispatch(openModal());
    }

    const handleCloseModal = () => {
        dispatch(closeModal());
        setTodo('');
        setModalError(false);
    }

    const handleGetTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setTodo(e.target.value);
    }

    const handleAddTodo = () => {
        if (todo) {
            dispatch(addTodo({ title: todo }));
            handleCloseModal();
        } else {
            setModalError(true);
        }
    }

    return (
        <div className={styles.Main}>
         <Header />
         <Todos />
         <img
        src={PlusIcon} 
          alt="Plus" 
          width={50} 
          height={50}
          className={styles.icon} 
          onClick={handleOpenModal}
         />
         <Modal
             allowOutsideClick
             key="modal"
             open={open} 
             title="new note" 
             onClose={handleCloseModal} 
             onComplete={handleAddTodo}
             controllers={{ completeBtn: 'APPLY', closeBtn: 'CANCEL' }}
            >
              <Input
               key="input"
               type="text"
               value={todo}
               onChange={handleGetTodo}
               placeholder="Add new Todo"
              />
              { modalError && <span className={styles.modalErrorText}>Please enter Todo</span> }
            </Modal>
        </div>
    );
}

export default Main;