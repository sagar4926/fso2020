const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

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
      return [...state, asObject(action.data)];
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

export const actionCreateAnecdote = (content) => {
  return {
    type: ACTIONS.CREATE_ANECDOTE,
    data: content,
  };
};

export const actionInitAnecdotes = (data) => {
  return {
    type: ACTIONS.INIT,
    data,
  };
};

export default anecdotesReducer;
