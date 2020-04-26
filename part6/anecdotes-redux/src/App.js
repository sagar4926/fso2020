import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdotesList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { actionInitAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionInitAnecdotes());
  }, [dispatch]);

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
