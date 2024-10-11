import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface IModalSate {
  isOpen: boolean
  product: any
}

interface _initialState {
  data: IModalSate
}
const initialState: _initialState = {
  data: {
    isOpen: false,
    product: {}
  }
}
export const modalProductState = createSlice({
  name: 'uiState',
  initialState,
  reducers: {
    _toggleModalProduct(state: any, action: PayloadAction<IModalSate>) {
      state.data = {
        ...action.payload,
      }
    },
    _closeModalProduct(state: any, action: PayloadAction<IModalSate>) {
      state = {
        ...action.payload,
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { _toggleModalProduct, _closeModalProduct } = modalProductState.actions

export default modalProductState.reducer