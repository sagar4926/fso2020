import React from "react";
import { useDispatch } from "react-redux";
import { actionCreateAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import anecdotes_api from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    const inputField = event.target.content;
    anecdotes_api
      .create({
        content,
        votes: 0,
      })
      .then((res) => {
        dispatch(actionCreateAnecdote(res));
        dispatch(setNotification(`Added new anecdote: ${res.content}`));
        inputField.value = "";
      });
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
