import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import NoAuthRoute from "./components/NoAuthRoute";
import Notifications from "./components/Notifications/Notifications";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./Dashboard";
import { initUser } from "./redux/reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
  }, []);

  return (
    <>
      <Notifications />
      <Switch>
        <NoAuthRoute path="/login">
          <LoginForm />
        </NoAuthRoute>
        <PrivateRoute path="/">
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </>
  );
};

export default App;