// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import modalReducer from './slices/modalSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
