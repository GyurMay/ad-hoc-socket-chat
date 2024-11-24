import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface OnlineUsersState {
    value: string,
    users: string[]
}

const initialState: OnlineUsersState = {
  value: '',
  users: []
}

export const OnlineUsersSlice = createSlice({
  name: 'onlineUsers',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload;
    },
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.users = (action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUsername, setOnlineUsers } = OnlineUsersSlice.actions

export default OnlineUsersSlice.reducer
