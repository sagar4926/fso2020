import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import AddBlogForm from "./components/AddBlogForm/AddBlogForm";
import BlogsList from "./components/BlogsList";
import LoginForm from "./components/LoginForm";
import Notifications from "./components/Notifications/Notifications";
import Togglable from "./components/Togglable";
import User from "./components/User";
import Users from "./components/Users";
import { initBlogs } from "./redux/reducers/blogsReducer";
import { initUser } from "./redux/reducers/userReducer";
import { initUsers } from "./redux/reducers/usersReducer";

const App = () => {
  const user = useSelector((state) => state.user);
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
      {user && <User user={user} />}
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/blogs">
          <Togglable buttonText="Add Blog" ref={blogFormRef}>
            <AddBlogForm onBlogAdded={blogAdded}></AddBlogForm>
          </Togglable>
          <BlogsList />
        </Route>
      </Switch>
    </>
  );
};

export default App;
