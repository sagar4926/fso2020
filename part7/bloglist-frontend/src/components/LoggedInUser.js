import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/userReducer";
import { useHistory } from "react-router-dom";
import { Typography, Button } from "@material-ui/core";
const LoggedInUser = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!user) {
    return null;
  }

  return (
    <>
      <Typography> Logged in {user.name} </Typography>
      <Button
        color="inherit"
        onClick={() => {
          dispatch(
            logout(() => {
              history.push("/login");
            })
          );
        }}
      >
        Logout
      </Button>
    </>
  );
};
export default LoggedInUser;
