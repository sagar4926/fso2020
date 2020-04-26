import React from "react";
import { connect } from "react-redux";
import { actionCreateAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ actionCreateAnecdote, setNotification }) => {
  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    actionCreateAnecdote(content);
    setNotification(`Added new anecdote: ${content}`);
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

const mapDispatchToProps = {
  actionCreateAnecdote,
  setNotification,
};
export default connect(null, mapDispatchToProps)(AnecdoteForm);
