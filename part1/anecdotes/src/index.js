import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(anecdotes.map((x) => 0));

  const nextAnecdote = () => {
    let nextVal = parseInt((Math.random() * 10) % anecdotes.length);
    if (nextVal === selected) {
      nextVal = ++nextVal % anecdotes.length;
    }
    setSelected(nextVal);
  };

  const vote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const getMostVotedAnecdote = () => {
    if (votes.length === 0) {
      return "";
    }

    let mostedVotedIndex = 0;
    let mostVotes = votes[0];
    for (let i = 1; i < votes.length; i++) {
      if (votes[i] > mostVotes) {
        mostedVotedIndex = i;
        mostVotes = votes[i];
      }
    }
    return props.anecdotes[mostedVotedIndex];
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={nextAnecdote}>next anecdote</button>
      <br />
      <h2>Anecdote with most votes</h2>
      <p>{getMostVotedAnecdote()}</p>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
