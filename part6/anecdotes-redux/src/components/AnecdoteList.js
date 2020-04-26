import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionVote } from "../reducers/anecdoteReducer";
const AnecdotesList = () => {
  const anecdotes = useSelector((state) => state).sort(
    (a, b) => a.votes < b.votes
  );

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(actionVote(id));
  };

  return (
    <>
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
    </>
  );
};

export default AnecdotesList;
