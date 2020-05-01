import React from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification/Notification";
import "./Notifications.css";

const Notifications = () => {
  const notifications = useSelector((state) =>
    state.notifications.filter((notification) => !notification.hide)
  );
  return (
    <div className="notifications">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
        ></Notification>
      ))}
    </div>
  );
};
export default Notifications;
