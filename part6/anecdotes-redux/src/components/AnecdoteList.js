import React from "react";
import { connect } from "react-redux";
import { actionVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
const AnecdotesList = ({ actionVote, setNotification, anecdotes }) => {
  const vote = (anecdote) => {
    actionVote(anecdote);
    setNotification(`Liked anecdote: ${anecdote.content}`, 3000);
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

const mapStateToProps = (state) => {
  const filter = state.filter;
  return {
    anecdotes: []
      .concat(state.anecdotes)
      .sort((a, b) => a.votes < b.votes)
      .filter((anecdote) => {
        return filter.length > 0 ? anecdote.content.includes(filter) : true;
      }),
  };
};
const mapDispatchToProps = {
  actionVote,
  setNotification,
};
export default connect(mapStateToProps, mapDispatchToProps)(AnecdotesList);
