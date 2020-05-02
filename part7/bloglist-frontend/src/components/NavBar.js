import React from "react";
import { Link } from "react-router-dom";
import LoggedInUser from "./LoggedInUser";

const NavBar = () => {
  const listStyle = {
    display: "inline-block",
    paddingLeft: 10,
  };
  return (
    <nav>
      <ul
        style={{
          listStyleType: "none",
          padding: 0,
        }}
      >
        <li style={listStyle}>
          <Link to="/blogs">blogs</Link>
        </li>
        <li style={listStyle}>
          <Link to="/users">users</Link>
        </li>
        <li style={listStyle}>
          <LoggedInUser />
        </li>
      </ul>
    </nav>
  );
};
export default NavBar;
