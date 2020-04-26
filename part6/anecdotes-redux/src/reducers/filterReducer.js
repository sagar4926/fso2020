const ACTIONS = {
  SET_FILTER: "SET_FILTER",
  CLEAR_FILTER: "CLEAR_FILTER",
};

const filterReducer = (state = "", action) => {
  switch (action.type) {
    case ACTIONS.SET_FILTER: {
      return action.data;
    }
    case ACTIONS.CLEAR_FILTER: {
      return "";
    }
    default:
      return state;
  }
};

export const setFilter = (filter) => {
  return {
    type: ACTIONS.SET_FILTER,
    data: filter,
  };
};

export const clearFilter = () => {
  return {
    type: ACTIONS.CLEAR_FILTER,
  };
};

export default filterReducer;
