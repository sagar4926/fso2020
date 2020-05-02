import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import AddBlogForm from "./components/AddBlogForm/AddBlogForm";
import Blog from "./components/Blog/Blog";
import BlogsList from "./components/BlogsList";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar";
import Notifications from "./components/Notifications/Notifications";
import Togglable from "./components/Togglable";
import User from "./components/User";
import Users from "./components/Users";
import { initBlogs } from "./redux/reducers/blogsReducer";
import { initUser } from "./redux/reducers/userReducer";
import { initUsers } from "./redux/reducers/usersReducer";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  // Using this over React.createRef persists the ref across state changes and re-renders
  const blogFormRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
    dispatch(initBlogs());
    dispatch(initUsers());
  }, []);

  const blogAdded = () => {
    blogFormRef.current.toggleVisiblity();
  };

  return (
    <>
      <Notifications />
      <NavBar />
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <PrivateRoute path="/users/:id">
          <User />
        </PrivateRoute>
        <PrivateRoute path="/users">
          <Users />
        </PrivateRoute>
        <PrivateRoute path="/blogs/:id">
          <Blog />
        </PrivateRoute>
        <PrivateRoute path="/blogs">
          <Togglable buttonText="Add Blog" ref={blogFormRef}>
            <AddBlogForm onBlogAdded={blogAdded}></AddBlogForm>
          </Togglable>
          <BlogsList />
        </PrivateRoute>
        <PrivateRoute path="/">
          <Redirect to="/blogs" />
        </PrivateRoute>
      </Switch>
    </>
  );
};

export default App;
