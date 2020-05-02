import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/reducers/userReducer";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/blogs");
    }
  }, [user]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return null;
  }

  const onLogin = (event) => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div>
      <h1>Log in to the app</h1>
      <form onSubmit={onLogin}>
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
        <button id="btn-submit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
