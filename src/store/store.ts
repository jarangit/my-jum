import { configureStore } from '@reduxjs/toolkit'
import uiStateReducer from './redux/slice/ui-state'
export default configureStore({
  reducer: {
    uiState: uiStateReducer
  }
})