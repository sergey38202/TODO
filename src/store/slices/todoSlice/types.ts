import { TReducerState } from '../../../types/store';
import { ITodoDto } from '../../../types/todo';

export type TTodoFilterTpye = 'all' | 'completed' | 'notCompleted';

export interface ITodoState {
    todos: ITodoDto[];
    status: TReducerState;
    error: string | null;
    filter?: TTodoFilterTpye;
    searchText: string;
}