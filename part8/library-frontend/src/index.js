import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import App from "./App";
import { setContext } from "apollo-link-context";

const tokenLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("library-token");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: tokenLink.concat(new HttpLink({ uri: "http://localhost:4000" })),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
