import { createSlice } from '@reduxjs/toolkit';
import { IModalState } from './types';
import { RootState } from '../..';


const initialState: IModalState = {
    open: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state) => {
            state.open = true;
        },
        closeModal: (state) => {
            state.open = false;
        }
    }
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectIsModalOpen = (state: RootState) => state.modal.open;
export default modalSlice.reducer;