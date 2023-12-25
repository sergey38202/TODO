import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITodoDto } from '../../../types/todo';
import { ITodoState, TTodoFilterTpye } from './types';
import { RootState } from '../..';
import { TODOS_KEY } from '../../../constants/localStorageKeyCodes';

const initialState: ITodoState = {
  todos: [],
  status: 'idle',
  error: null,
  filter: 'all',
  searchText: '',
};

const fetchTodos = (): ITodoDto[] => {
  try {
    const storedTodos = localStorage.getItem(TODOS_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    throw new Error('Error fetching todos');
  }
};

export const fetchTodosAsync = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    return fetchTodos();
  } catch (error) {
    throw new Error('Error fetching todos');
  }
});

export const selectFilteredTodos = (state: RootState) => {
  const { todos, filter, searchText } = state.todos;

  return todos.filter((todo) => {
    const titleMatches = todo.title.toLowerCase().includes(searchText.toLowerCase());

    switch (filter) {
      case 'completed':
        return titleMatches && todo.checked;
      case 'notCompleted':
        return titleMatches && !todo.checked;
      case 'all':
      default:
        return titleMatches;
    }
  });
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string }>) => {
      const newTodo: ITodoDto = {
        id: state.todos.length + 1,
        title: action.payload.title,
        checked: false,
      };
      state.todos.push(newTodo);
      localStorage.setItem(TODOS_KEY, JSON.stringify(state.todos));
    },
    updateTodo: (state, action: PayloadAction<{ id: number; title: string }>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo
      );
      localStorage.setItem(TODOS_KEY, JSON.stringify(state.todos));
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todoToggle = state.todos.find((todo) => todo.id === action.payload);
      if (todoToggle) {
        todoToggle.checked = !todoToggle.checked;
      }
      localStorage.setItem(TODOS_KEY, JSON.stringify(state.todos));
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem(TODOS_KEY, JSON.stringify(state.todos));
    },
    filterTodo: (state, action: PayloadAction<TTodoFilterTpye>) => {
      state.filter = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodosAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Error fetching todos';
      });
  },
});

export const {
  addTodo,
  updateTodo,
  toggleTodo,
  removeTodo,
  filterTodo,
  setSearchText,
} = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos.todos;
export const selectStatus = (state: RootState) => state.todos.status;
export const selectError = (state: RootState) => state.todos.error;

export default todoSlice.reducer;
