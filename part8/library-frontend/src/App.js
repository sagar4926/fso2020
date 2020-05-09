import { useApolloClient, useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LoginForm from "./components/LoginForm";
import NewBook from "./components/NewBook";
import Recommendations from "./components/Recommendations";
import { S_BOOK_ADDED } from "./graphql/subscriptions";
import { Q_RECOMMENDED_BOOKS } from "./graphql/queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(undefined);
  const [notification, setNotification] = useState(undefined);

  const client = useApolloClient();

  useEffect(() => {
    setToken(localStorage.getItem("library-token"));
  }, []);

  useSubscription(S_BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      const allBooks = client.readQuery({ query: Q_RECOMMENDED_BOOKS });
      client.writeQuery({
        query: Q_RECOMMENDED_BOOKS,
        data: {
          ...allBooks,
          allBooks: [...allBooks.allBooks, subscriptionData.data.bookAdded],
        },
      });
      setNotification(
        `New Book added: ${subscriptionData.data.bookAdded.title}`
      );
      setTimeout(() => setNotification(undefined), 5000);
    },
  });

  return (
    <div>
      {notification && (
        <div
          style={{
            position: "fixed",
            right: 20,
            top: 20,
            width: 300,
            padding: 10,
            color: "green",
            border: "1px solid green",
          }}
        >
          {notification}
        </div>
      )}
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

      {token && <NewBook show={page === "add"} />}
      {token && <Recommendations show={page === "recommendations"} />}
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
