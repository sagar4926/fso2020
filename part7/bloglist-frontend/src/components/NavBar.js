import { AppBar, Button, Toolbar } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import LoggedInUser from "./LoggedInUser";

const NavBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/blogs">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
        </div>
        <LoggedInUser />
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
