import React from "react";
import { useSelector } from "react-redux";

const Notification = ({ message }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    margin: 5,
    background: "white",
  };

  return <div style={style}>{message}</div>;
};

const Notifications = () => {
  const notifications = useSelector((state) =>
    state.notifications.filter((notification) => notification.hide === false)
  );

  return (
    <div
      style={{
        position: "fixed",
        width: "400px",
        right: 10,
        top: 10,
      }}
    >
      {notifications.map((notification) => (
        <Notification key={notification.id} message={notification.message} />
      ))}
    </div>
  );
};

export default Notifications;
