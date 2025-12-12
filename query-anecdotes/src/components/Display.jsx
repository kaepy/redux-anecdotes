import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

// Component to display the current notification
const Display = () => {
  const { notification } = useContext(NotificationContext) // Get notification from context

  return <div>{notification}</div>
}

export default Display
