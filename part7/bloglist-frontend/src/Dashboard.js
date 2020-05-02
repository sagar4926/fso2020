import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import AddBlogForm from "./components/AddBlogForm/AddBlogForm";
import Blog from "./components/Blog/Blog";
import BlogsList from "./components/BlogsList";
import NavBar from "./components/NavBar";
import Togglable from "./components/Togglable";
import User from "./components/User";
import Users from "./components/Users";
import { initBlogs } from "./redux/reducers/blogsReducer";
import { initUsers } from "./redux/reducers/usersReducer";
import { Toolbar } from "@material-ui/core";

const Dashboard = () => {
  // Using this over React.createRef persists the ref across state changes and re-renders
  const blogFormRef = useRef(null);
  const blogAdded = () => {
    blogFormRef.current.toggleVisiblity();
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
    dispatch(initUsers());
  }, []);

  console.log("Dashboard render");

  return (
    <>
      <NavBar />
      <Toolbar />
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/blogs">
          <Togglable buttonText="Add Blog" ref={blogFormRef}>
            <AddBlogForm onBlogAdded={blogAdded}></AddBlogForm>
          </Togglable>
          <BlogsList />
        </Route>
        <Route path="/">
          <Redirect to="/blogs" />
        </Route>
      </Switch>
    </>
  );
};
export default Dashboard;
