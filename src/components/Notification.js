const Notification = ({ notification }) => {
  const style = {
    padding: "10px",
    margin: "10px 0",
    backgroundColor: "lightgrey",
    fontSize: "20px",
    borderRadius: "10px",
  };

  return notification.message ? (
    <div
      style={
        !notification.error
          ? { ...style, color: "green", border: "2px solid green" }
          : { ...style, color: "red", border: "2px solid red" }
      }
    >
      {notification.message}
    </div>
  ) : null;
};

export default Notification;
