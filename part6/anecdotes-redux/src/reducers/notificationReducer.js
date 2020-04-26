const ACTIONS = {
  SET_NOTIFICATION: "SET_NOTIFICATION",
};

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case ACTIONS.SET_NOTIFICATION: {
      return action.data;
    }
    default:
      return state;
  }
};

export const setNotification = (message) => {
  return {
    type: ACTIONS.SET_NOTIFICATION,
    data: {
      id: new Date().getMilliseconds,
      message,
    },
  };
};

export const clearNotification = () => {
  return {
    type: ACTIONS.SET_NOTIFICATION,
    data: null,
  };
};

export default notificationReducer;
