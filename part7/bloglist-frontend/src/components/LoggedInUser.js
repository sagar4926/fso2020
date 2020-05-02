import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/userReducer";
import { useHistory } from "react-router-dom";
const LoggedInUser = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!user) {
    return null;
  }

  return (
    <div>
      <span> Logged in {user.name} </span>
      <button
        onClick={() => {
          dispatch(
            logout(() => {
              history.push("/login");
            })
          );
        }}
      >
        Logout
      </button>
    </div>
  );
};
export default LoggedInUser;
