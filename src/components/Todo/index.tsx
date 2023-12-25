import { FC, useState } from 'react';
import PenIcon from "../../assets/icons/pen.svg";
import TrashIcon from "../../assets/icons/trash.svg";

import styles from "./styles.module.scss";
import { ITodoDto } from '../../types/todo';
import classNames from '../../utilities/classNames';
import { useDispatch } from 'react-redux';
import { removeTodo, toggleTodo, updateTodo } from '../../store/slices/todoSlice';
import Input from '../Input';
import CheckedIcon from "../../assets/icons/checked.svg";
import useTodo from './useTodo';

const Todo: FC<ITodoDto> = (props) => {
    const { id, title, checked = false } = props;

    const [edit, setEdit] = useState<boolean>(false);
    const [todo, setTodo] = useState<string>(title);

    const dispatch = useDispatch();
    const { todoClasses, completedClasses } = useTodo();

    const handleToggleCheckbox = (id: number) => {
        dispatch(toggleTodo(id));
    }

    const handleToggleEdit = (payload: boolean) => {
        setEdit(payload);
    }

    const handleSetTodoValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodo(e.target.value);
    }

    const handleUpdateTodo = (id: number) => {
        dispatch(updateTodo({id, title: todo || title}));
        setEdit(false);
    }

    const handleRemoveTodo = (id: number) => {
        dispatch(removeTodo(id));
    }

    return (
        <div className={styles.Todo}>
            { !edit ? (
                <>
                <div className={styles.inputWrapper}>
                    <input 
                     type="checkbox" 
                     className={styles.checkbox} 
                     id={`${id}`} 
                     defaultChecked={checked} 
                     onChange={() => handleToggleCheckbox(id)} 
                    />
                    <label
                     htmlFor={`${id}`}
                     className={classNames(todoClasses, checked && completedClasses)}>
                        { title }
                    </label>
                </div>
                <div className={styles.iconWrapper}>
                    <img 
                     src={PenIcon} 
                     alt="Pen" 
                     width={18} 
                     height={18} 
                     onClick={() => handleToggleEdit(true)} 
                    />
                    <img 
                     src={TrashIcon} 
                     alt="Trash" 
                     width={18} 
                     height={18}
                     onClick={() => handleRemoveTodo(id)}
                     />
                </div>
                </>
            ) : (
                <div className={styles.editInputWrapper}>
                 <Input
                 value={todo} 
                 defaultValue={title} 
                 onChange={handleSetTodoValue} 
                 placeholder="Enter updated note" 
                />
                <img
                 src={CheckedIcon} 
                 alt="Check" 
                 width={18} 
                 height={18}
                 onClick={() => handleUpdateTodo(id)}
                 />
                </div>
            ) }
        </div>
    );
}

export default Todo;