import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

const NoAuthRoute = ({ children, ...rest }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  return (
    <Route
      {...rest}
      render={() => (user ? <Redirect to={from} /> : children)}
    />
  );
};
export default NoAuthRoute;
