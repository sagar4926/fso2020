import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddBlogForm from "./components/AddBlogForm/AddBlogForm";
import BlogsList from "./components/BlogsList";
import LoginForm from "./components/LoginForm";
import Notifications from "./components/Notifications/Notifications";
import Togglable from "./components/Togglable";
import User from "./components/User";
import {
  addBlog,
  deleteBlog,
  initBlogs,
  likeBlog,
} from "./redux/reducers/blogsReducer";
import { addNotification } from "./redux/reducers/notificationsReducer";
import storageService from "./services/storage";

const App = () => {
  const blogs = useSelector((state) => state.blogs);
  const [user, setUser] = useState(undefined);
  // Using this over React.createRef persists the ref across state changes and re-renders
  const blogFormRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(storageService.getUser());
  }, []);

  useEffect(() => {
    dispatch(initBlogs());
  }, []);

  const _showNotification = (message, type) => {
    dispatch(addNotification(message, type));
  };
  const showErrorNotification = (message) => {
    _showNotification(message, "error");
  };

  const showSuccessNotification = (message) => {
    _showNotification(message, "success");
  };

  const blogAdded = (data) => {
    dispatch(addBlog(data));
    blogFormRef.current.toggleVisiblity();
  };

  const blogLiked = (blog) => {
    dispatch(likeBlog(blog));
  };

  const blogDeleted = (blog) => {
    dispatch(deleteBlog(blog));
  };

  return (
    <>
      <Notifications />
      {!user && (
        <LoginForm
          onLogin={(user) => {
            storageService.storeUser(user);
            setUser(user);
            showSuccessNotification("Logged in!");
          }}
          onError={(error) => {
            showErrorNotification(error);
          }}
        ></LoginForm>
      )}
      {user && (
        <>
          <User
            user={user}
            onLogout={() => {
              storageService.removeUser();
              setUser(undefined);
              showSuccessNotification("Logged out!");
            }}
          ></User>
          <Togglable buttonText="Add Blog" ref={blogFormRef}>
            <AddBlogForm onBlogAdded={blogAdded}></AddBlogForm>
          </Togglable>
          <BlogsList
            blogs={blogs}
            onLike={blogLiked}
            onDelete={blogDeleted}
          ></BlogsList>
        </>
      )}
    </>
  );
};

export default App;
