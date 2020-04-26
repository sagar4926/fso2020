import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
const AnecdotesList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) => state.anecdotes)
    .sort((a, b) => a.votes < b.votes)
    .filter((anecdote) => {
      return filter.length > 0 ? anecdote.content.includes(filter) : true;
    });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(actionVote(anecdote));
    dispatch(setNotification(`Liked anecdote: ${anecdote.content}`));
  };

  return (
    <>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdotesList;
