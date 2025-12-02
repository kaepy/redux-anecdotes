import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    // Action to set the notification message
    setNotification(state, action) {
      return action.payload;
    },
    // Action to clear the notification message
    clearNotification() {
      return "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

// Thunk action to show a notification for 5 seconds by default
export const showNotification =
  (message, timeout = 5000) =>
  (dispatch) => {
    dispatch(setNotification(message));

    if (timeout > 0) {
      setTimeout(() => {
        dispatch(clearNotification());
      }, timeout);
    }
  };

export default notificationSlice.reducer;
