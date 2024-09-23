import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface _initialState {
  isOpenModal: boolean
}
const initialState: _initialState = {
  isOpenModal: false
}
export const uiState = createSlice({
  name: 'uiState',
  initialState,
  reducers: {
    openCenterModal(state: any) {
      state.isOpenModal = true
    },
    closeCenterModal(state: any) {
      state.isOpenModal = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { openCenterModal, closeCenterModal } = uiState.actions

export default uiState.reducer