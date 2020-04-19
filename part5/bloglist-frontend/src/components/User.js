import React from "react";
const User = ({ user, onLogout }) => {
  return (
    <>
      <p> {user.name} logged in </p>
      <button onClick={onLogout}>Logout</button>
    </>
  );
};
export default User;
