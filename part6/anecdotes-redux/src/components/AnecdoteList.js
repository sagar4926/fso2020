import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
const AnecdotesList = () => {
  const anecdotes = useSelector((state) => state.anecdotes).sort(
    (a, b) => a.votes < b.votes
  );

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(actionVote(id));
    dispatch(
      setNotification(
        `Liked anecdote: ${anecdotes.find((a) => a.id === id).content}`
      )
    );
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
