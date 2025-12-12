import { useNotification } from '../hooks/useNotification' // Import notification hook

const Notification = () => {
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
