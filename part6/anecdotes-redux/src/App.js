import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdotesList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notifications from "./components/Notifications";
import { actionInitAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionInitAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <Filter />
      <Notifications />
      <AnecdotesList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
