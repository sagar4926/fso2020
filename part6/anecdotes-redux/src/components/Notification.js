import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.notification);

  const [timerToClear, setTimerToClear] = useState(undefined);

  useEffect(() => {
    const clear = () => {
      dispatch(clearNotification());
      setTimerToClear(undefined);
    };

    if (message) {
      if (timerToClear) {
        clearInterval(timerToClear);
        setTimerToClear(undefined);
      }
      setTimerToClear(setTimeout(clear, 5000));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return message ? <div style={style}>{message.message}</div> : null;
};

export default Notification;
