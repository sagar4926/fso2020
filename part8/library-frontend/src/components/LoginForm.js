import React, { useState, useEffect } from "react";
import { M_LOGIN } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const LoginForm = ({ show, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(M_LOGIN);

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      localStorage.setItem("library-token", token);
      onLogin(token);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  if (!show) {
    return null;
  }

  const onSubmit = (event) => {
    event.preventDefault();

    login({
      variables: {
        username,
        password,
      },
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <label>
        Username
        <br />
        <input
          style={{ display: "block" }}
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        Password
        <br />
        <input
          style={{ display: "block" }}
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button style={{ display: "block" }} type="submit">
        Log in
      </button>
    </form>
  );
};
export default LoginForm;
