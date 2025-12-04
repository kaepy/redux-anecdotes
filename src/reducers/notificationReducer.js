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

// Thunk action to show a notification for given timeout value as seconds
// timeout value is in seconds and should be converted to milliseconds

let timeoutId = null;

export const showNotification = (message, timeout) => (dispatch) => {
  if (!message) return;

  // Convert timeout from seconds to milliseconds
  const ms = Math.max(0, Number(timeout) || 0) * 1000;

  // Clear any existing timeout to avoid overlapping notifications
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }

  // Dispatch action to set the notification message
  dispatch(setNotification(message));

  // If timeout is greater than 0, set a timeout to clear the notification
  if (ms > 0) {
    timeoutId = setTimeout(() => {
      dispatch(clearNotification()); // Clear the notification after the timeout
      timeoutId = null;
    }, ms);
  }
};

export default notificationSlice.reducer;
