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
        anecdote.id === action.data.id ? action.data : anecdote
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

export const actionVote = (anecdote) => {
  return async (dispatch) => {
    const data = await anecdotes_api.update(anecdote.id, {
      votes: anecdote.votes + 1,
    });
    dispatch({
      type: ACTIONS.VOTE,
      data: data,
    });
  };
};

export const actionCreateAnecdote = (content) => {
  return async (dispatch) => {
    const data = await anecdotes_api.create({
      content,
      votes: 0,
    });
    dispatch({
      type: ACTIONS.CREATE_ANECDOTE,
      data,
    });
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
