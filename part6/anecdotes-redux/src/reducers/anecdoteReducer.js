const initial_anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
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

const initialState = initial_anecdotes.map(asObject);

export const ACTIONS = {
  VOTE: "VOTE",
  CREATE_ANECDOTE: "CREATE_ANECDOTE",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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

export default reducer;
