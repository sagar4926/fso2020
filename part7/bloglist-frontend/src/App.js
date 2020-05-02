import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBlogForm from "./components/AddBlogForm/AddBlogForm";
import BlogsList from "./components/BlogsList";
import LoginForm from "./components/LoginForm";
import Notifications from "./components/Notifications/Notifications";
import Togglable from "./components/Togglable";
import User from "./components/User";
import { initBlogs } from "./redux/reducers/blogsReducer";
import { initUser } from "./redux/reducers/userReducer";

const App = () => {
  const user = useSelector((state) => state.user);
  // Using this over React.createRef persists the ref across state changes and re-renders
  const blogFormRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
    dispatch(initBlogs());
  }, []);

  const blogAdded = () => {
    blogFormRef.current.toggleVisiblity();
  };

  return (
    <>
      <Notifications />
      {!user && <LoginForm />}
      {user && (
        <>
          <User user={user}/>
          <Togglable buttonText="Add Blog" ref={blogFormRef}>
            <AddBlogForm onBlogAdded={blogAdded}></AddBlogForm>
          </Togglable>
          <BlogsList />
        </>
      )}
    </>
  );
};

export default App;
