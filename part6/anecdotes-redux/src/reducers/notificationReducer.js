const ACTIONS = {
  SET_NOTIFICATION: "SET_NOTIFICATION",
  CLEAR_NOTIFICATION: "CLEAR_NOTIFICATION",
};

const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.SET_NOTIFICATION: {
      console.log("Data ", action.data);
      return [...state, action.data];
    }
    case ACTIONS.CLEAR_NOTIFICATION: {
      return state.map((notification) =>
        notification.id === action.data
          ? { ...notification, hide: true }
          : notification
      );
    }
    default:
      return state;
  }
};

export const setNotification = (message, time = 5000) => {
  return async (dispatch) => {
    const _id = new Date().getMilliseconds();
    dispatch({
      type: ACTIONS.SET_NOTIFICATION,
      data: {
        id: _id,
        message,
        hide: false,
      },
    });
    await ((id) => {
      return new Promise((resolve) =>
        setTimeout(() => {
          dispatch(clearNotification(id));
          resolve();
        }, time)
      );
    })(_id);
  };
};

export const clearNotification = (data) => {
  return {
    type: ACTIONS.CLEAR_NOTIFICATION,
    data,
  };
};

export default notificationReducer;
