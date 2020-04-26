import React from "react";
import { useDispatch } from "react-redux";
import { actionCreateAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    dispatch(actionCreateAnecdote(content));
    dispatch(setNotification(`Added new anecdote: ${content}`));
    event.target.content.value = "";
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="content" placeholder="Enter anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
