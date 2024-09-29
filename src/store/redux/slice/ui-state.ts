import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface IModalSate {
  isOpen: boolean
  title?: string
  desc1?: string
  desc2?: string
}

interface _initialState {
  modalSate: IModalSate
}
const initialState: _initialState = {
  modalSate: {
    isOpen: false,
    desc1: '',
    desc2: ''
  }
}
export const uiState = createSlice({
  name: 'uiState',
  initialState,
  reducers: {
    openCenterModal(state: any, action: PayloadAction<IModalSate>) {
      state.modalSate = {
        ...action.payload,
        isOpen: true
      }
    },
    closeCenterModal(state: any, action: PayloadAction<IModalSate>) {
      state.modalSate = {
        ...action.payload,
        isOpen: false
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { openCenterModal, closeCenterModal } = uiState.actions

export default uiState.reducer