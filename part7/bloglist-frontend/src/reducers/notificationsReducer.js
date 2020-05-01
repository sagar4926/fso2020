/* eslint-disable indent */
const ACTIONS = {
  ADD: "ADD",
  CLEAR: "CLEAR",
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

export const addNotification = (message, type = "success") => async (
  dispatch
) => {
  const id = new Date().getTime();
  dispatch({
    type: ACTIONS.ADD,
    data: {
      id,
      message,
      type,
      hide: false,
    },
  });
  dispatch(clearNotificationDelayed(id));
};

export const clearNotificationDelayed = (id, time = 5000) => async (
  dispatch
) => {
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
