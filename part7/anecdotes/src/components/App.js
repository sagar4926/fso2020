import React, { useState } from "react";
import NavBar from "./NavBar";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Anecdotes from "./Anecdotes";
import About from "./About";
import CreateAnecdoteForm from "./CreateAnecdoteForm";
import Anecdote from "./Anecdote";
import Notification from "./notification/Notification";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);

  const [notification, setNotification] = useState(undefined);
  const history = useHistory();

  const showNotification = (message, time = 5000, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(undefined), 5000);
  };

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    showNotification(`a new anecdote "${anecdote.content}" created!`, 10000);
    history.push("/anecdotes");
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useRouteMatch("/anecdotes/:id");
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === match.params.id)
    : null;

  return (
    <div>
      <Header />
      <NavBar />
      <Notification notification={notification} />
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/anecdotes">
          <Anecdotes anecdotes={anecdotes} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/create">
          <CreateAnecdoteForm addNew={addNew} />
        </Route>
        <Route path="/">
          <Redirect to="/anecdotes"></Redirect>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
};

export default App;
