//import { useContext } from 'react'
//import NotificationContext from '../NotificationContext' // Import notification context
// Use notification hook instead of context directly: ESLint warning about "Fast refresh only works when a file only exports components" is a Vite development constraint—it doesn't affect functionality but suggests extracting the hook to its own file for cleaner hot-module reloading.

import { useNotification } from '../hooks/useNotification' // Import notification hook

const Notification = () => {
  ///const { notification } = useContext(NotificationContext) // Get notification from context
  const { notification } = useNotification() // Get notification from hook

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  if (!notification) return null // Don't render if no notification

  return <div style={style}>{notification}</div>
}

export default Notification
