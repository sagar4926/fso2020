import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import { useApolloClient, useQuery } from "@apollo/client";
import { Q_ME } from "./graphql/queries";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(undefined);
  const client = useApolloClient();

  useEffect(() => {
    setToken(localStorage.getItem("library-token"));
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && (
          <>
            <button onClick={() => setPage("recommendations")}>
              recommendations
            </button>
            <button onClick={() => setPage("add")}>add book</button>
            <button
              onClick={() => {
                client.resetStore();
                localStorage.removeItem("library-token");
                setToken(undefined);
              }}
            >
              logout
            </button>
          </>
        )}
        {!token && <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />
      <Recommendations show={page === "recommendations"} />
      <LoginForm
        show={page === "login"}
        onLogin={(value) => {
          setToken(value);
          setPage("authors");
        }}
      />
    </div>
  );
};

export default App;
