import { FC, memo, useEffect } from 'react';
import styles from "./styles.module.scss";
import Todo from '../Todo';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchTodosAsync, selectFilteredTodos } from '../../store/slices/todoSlice';
import Loader from '../Loader';
import useTodos from './useTodos';

const Todos: FC = () => {
    const filteredTodos = useSelector(selectFilteredTodos);
    const { status } = useSelector((state: RootState) => state.todos);
    const { emptyIcon, emptyTitleClasses } = useTodos();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchTodosAsync());
    }, [dispatch]);

    if (status !== 'succeeded') {
        return <Loader />
    }

    const reversedFilteredTodos = [...filteredTodos].reverse();

    return (
        <div className={styles.Todos}>
            { reversedFilteredTodos.length > 0 ? reversedFilteredTodos.map((todo) => (
                <Todo key={todo.id} {...todo} />
            )) : (
                <div className={styles.emptyWrapper}>
                    <img src={emptyIcon} width={221} height={174} alt='No Todos' className={styles.emptyImage} />
                    <div className={emptyTitleClasses}>Empty...</div>
                </div>
            ) }
        </div>
    );
}

export default memo(Todos);