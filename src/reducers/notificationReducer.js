import { createSlice } from "@reduxjs/toolkit";

const notificationMessage = "This is a notification message.";

const notificationSlice = createSlice({
  name: "notification",
  initialState: notificationMessage,
  reducers: {
    // Action to set the notification message
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
