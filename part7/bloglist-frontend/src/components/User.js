import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/reducers/userReducer";
const User = ({user}) => {
  const dispatch = useDispatch();

  return (
    <>
      <p> {user.name} logged in </p>
      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </button>
    </>
  );
};
export default User;
