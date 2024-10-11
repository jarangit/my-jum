import { configureStore } from '@reduxjs/toolkit'
import uiStateReducer from './redux/slice/ui-state'
import userStateReducer from './redux/slice/userSlice'
import modalProductStateReducer from './redux/slice/modal-product'
export const store = configureStore({
  reducer: {
    uiState: uiStateReducer,
    userState: userStateReducer,
    modalProductState: modalProductStateReducer
  }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch