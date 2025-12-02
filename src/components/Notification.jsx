import { useSelector } from "react-redux";

// Component to display notifications
const Notification = () => {
  const style = {
    border: "1px solid #ccc",
    padding: 10,
    borderRadius: 4,
    marginBottom: 10,
    backgroundColor: "#fff9db",
  };

  // Get notification message from Redux store
  const notification = useSelector((state) => state.notification);

  // Don't render anything if there's no notification
  if (!notification) return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;
