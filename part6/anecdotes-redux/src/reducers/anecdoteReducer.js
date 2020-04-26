import anecdotes_api from "../services/anecdotes";

const initialState = [];

export const ACTIONS = {
  VOTE: "VOTE",
  CREATE_ANECDOTE: "CREATE_ANECDOTE",
  INIT: "INIT",
};

const anecdotesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.INIT: {
      return [].concat(action.data);
    }
    case ACTIONS.VOTE: {
      return state.map((anecdote) =>
        anecdote.id === action.data
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    }
    case ACTIONS.CREATE_ANECDOTE: {
      return [...state, action.data];
    }
    default: {
      return state;
    }
  }
};

export const actionVote = (id) => {
  return {
    type: ACTIONS.VOTE,
    data: id,
  };
};

export const actionCreateAnecdote = (data) => {
  return {
    type: ACTIONS.CREATE_ANECDOTE,
    data,
  };
};

export const actionInitAnecdotes = () => {
  return async (dispatch) => {
    const data = await anecdotes_api.getAll();
    dispatch({
      type: ACTIONS.INIT,
      data,
    });
  };
};

export default anecdotesReducer;
