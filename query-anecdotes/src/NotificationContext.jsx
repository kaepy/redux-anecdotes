import { createContext, useReducer } from 'react'

// Reducer function to manage notification state
const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

// Create notification context
const NotificationContext = createContext()

// Provider component to wrap the app and provide notification state
export const NotificationContextProvider = (props) => {
  // Use useReducer to manage notification state
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    '',
  ) // Initial state is an empty string

  // Function to show notification for a specified duration
  const showNotification = (message, ms = 5000) => {
    // Default duration is 5000ms for safety
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: message }) // Set notification message
    setTimeout(() => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }), ms) // Clear after duration
  }

  // Provide notification state and functions to children components
  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch, showNotification }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
