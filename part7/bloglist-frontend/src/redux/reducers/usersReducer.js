import users from "../../services/users";

const ACTIONS = {
  INIT: "INIT_USERS",
};

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.INIT: {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export const initUsers = () => async (dispatch) => {
  const data = await users.getAll();
  dispatch({
    type: ACTIONS.INIT,
    data: data,
  });
};
export default usersReducer;
