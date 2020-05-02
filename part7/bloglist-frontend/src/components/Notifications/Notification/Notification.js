import React from "react";
import { Alert } from "@material-ui/lab";
const Notification = ({ notification }) => {
  return (
    <Alert
      className="notification"
      severity={notification.type}
      style={{ marginBottom: 10 }}
    >
      {" "}
      {notification.message}{" "}
    </Alert>
  );
};

export default Notification;
