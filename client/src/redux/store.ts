
import { configureStore } from '@reduxjs/toolkit'
import onlineUsersReducer from './slice/onlineUsers-slice';
import chatDataReducer from './slice/chatData-slice';

export const store = configureStore({
  reducer: {
    onlineUsers: onlineUsersReducer,
    chatData: chatDataReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch