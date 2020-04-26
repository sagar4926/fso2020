import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreateAnecdote, actionVote } from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector((state) => state).sort(
    (a, b) => a.votes < b.votes
  );

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(actionVote(id));
  };

  const createAnecdote = (event) => {
    event.preventDefault();
    dispatch(actionCreateAnecdote(event.target.content.value));
    event.target.content.value = "";
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="content" placeholder="Enter anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
