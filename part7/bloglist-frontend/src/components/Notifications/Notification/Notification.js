import React from "react";
import "./Notification.css";

const Notification = ({ notification }) => {
  return <div className={`notification ${notification.type}`}>{notification.message}</div>;
};

export default Notification;
