import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = 
createSlice({
  name: "chat",
  initialState: {
    chatId: null,
    chatName: null,
  },
  reducers: {
    setChat: (state, action) => {
      state.chat = action.payload.chatId;
      state.chatName = action.payload.chatName;

    },
  },
});

export const { setChat } = chatSlice.actions;


export const selectchatName = (state) => state.chat.chatName;
export const selectChatId = (state) => state.chat.chatId;


export default chatSlice.reducer;
