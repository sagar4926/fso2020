import React, { useState } from "react";
import loginApi from "../services/login";

const LoginForm = ({ onLogin, onError }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();
    loginApi
      .login(username, password)
      .then(onLogin)
      .catch(() => onError("Login failed!. Username or password is incorrect"));
  };

  return (
    <div>
      <h1>Log in to the app</h1>
      <form onSubmit={login}>
        <label style={{ display: "block" }}>
          Username:
          <input
            id="in-username"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value);
            }}
            placeholder="Enter username"
          ></input>
        </label>
        <label style={{ display: "block" }}>
          Password:
          <input
            id="in-password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
            placeholder="password"
            type="password"
          ></input>
        </label>
        <button id="btn-submit" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
