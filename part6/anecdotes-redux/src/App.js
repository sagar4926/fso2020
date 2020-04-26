import React from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdotesList from "./components/AnecdoteList";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

const App = () => {
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
