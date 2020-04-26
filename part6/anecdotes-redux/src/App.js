import React, { useEffect } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdotesList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";
import anecdotes_api from "./services/anecdotes";
import { useDispatch } from "react-redux";
import { actionInitAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    anecdotes_api.getAll().then((res) => {
      dispatch(actionInitAnecdotes(res));
    });
  }, []);

  return (
    <div>
      <Filter />
      <Notification />
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
