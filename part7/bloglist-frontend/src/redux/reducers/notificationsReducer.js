const ACTIONS = {
  ADD: "ADD_NOTIFICATION",
  CLEAR: "CLEAR_NOTIFICATION",
};

const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.ADD: {
      return [...state, action.data];
    }
    case ACTIONS.CLEAR: {
      return state.filter((notification) => notification.id !== action.id);
    }
    default: {
      return state;
    }
  }
};

export const addNotification = (
  message,
  type = "success",
  time = 5000
) => async (dispatch) => {
  const id = new Date().getTime();
  dispatch({
    type: ACTIONS.ADD,
    data: {
      id,
      message,
      type
    },
  });
  dispatch(clearNotificationDelayed(id, time));
};

export const clearNotificationDelayed = (id, time) => async (dispatch) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      dispatch({
        type: ACTIONS.CLEAR,
        id,
      });
      resolve();
    }, time);
  });
};

export default notificationReducer;
