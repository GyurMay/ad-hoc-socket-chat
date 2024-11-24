import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ChatDataState {
  mru:string,
  chatData: [ChatElement]; 
}
export interface ChatElement {
  toId: string,
  senderId: string,
  message: string,
  timestamp: string,
}

// const initialState: ChatDataState = {
//   mru: 'most recent message',
//   chatData: [{
//     toId: '',
//     messages: [{
//         senderId: '',
//         message: ''
//     }]
//   }]
// }
const initialState: ChatDataState = {
  mru: 'most recent message',
  chatData: [
    {
      senderId: '',
      toId: '',
      message: '',
      timestamp: ''
    }
  ]
}


export const ChatDataSlice = createSlice({
  name: 'chatData',
  initialState,
  reducers: { 
    addMessage: (state, action: PayloadAction<ChatElement>) => {
        // const {toId, senderId, message, timestamp} = action.payload;
        console.log("messageStack already exists", state.chatData);
        state.chatData.push(action.payload);
    },
    createMessageBox: (state, action: PayloadAction<string>) => {

    }
  }
})

// Action creators are generated for each case reducer function
export const { addMessage, createMessageBox } = ChatDataSlice.actions

export default ChatDataSlice.reducer
