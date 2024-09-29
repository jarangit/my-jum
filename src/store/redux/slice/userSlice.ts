import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUser {
  id: number | null,
  username: string
}
interface _initialState {
  user: IUser
}
const initialState: _initialState = {
  user: {
    id: null,
    username: ''
  }
}
export const userState = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    initUser(state: any, action: PayloadAction<any>) {
      state.user = {
        ...action.payload,
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { initUser } = userState.actions

export default userState.reducer