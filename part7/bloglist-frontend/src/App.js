import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
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
        <Route path="/login">
          <LoginForm />
        </Route>
        <PrivateRoute path="/">
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </>
  );
};

export default App;
