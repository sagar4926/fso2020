import loginApi from "../../services/login";
import storageService from "../../services/storage";
import { addNotification } from "./notificationsReducer";

const ACTIONS = {
  INIT: "USER_INIT",
  LOGIN: "USER_LOGIN",
  LOGOUT: "USER_LOGOUT",
};
const userReducer = (state = null, action) => {
  switch (action.type) {
    case ACTIONS.INIT:
    case ACTIONS.LOGIN: {
      return action.data;
    }
    case ACTIONS.LOGOUT: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;

export const initUser = () => {
  const data = storageService.getUser();
  return {
    type: ACTIONS.INIT,
    data: data ? data : null,
  };
};

export const login = (username, password) => async (dispatch) => {
  loginApi
    .login(username, password)
    .then((user) => {
      storageService.storeUser(user);
      dispatch({
        type: ACTIONS.LOGIN,
        data: user,
      });
      dispatch(addNotification("Logged in!"));
    })
    .catch(() =>
      addNotification(
        "Login failed!. Username or password is incorrect",
        "error"
      )
    );
};

export const logout = () => async (dispatch) => {
  storageService.removeUser();
  dispatch({
    type: ACTIONS.LOGOUT,
  });
  dispatch(addNotification("Logged out!"));
};
