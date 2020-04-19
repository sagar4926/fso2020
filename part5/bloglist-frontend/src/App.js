import React, { useEffect, useState } from "react";
import BlogsList from "./components/BlogsList";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import User from "./components/User";
import storageService from "./services/storage";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/notification/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(undefined);
  const [notification, setNotification] = useState(undefined);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    setUser(storageService.getUser());
  }, []);

  const _showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(undefined), 5000);
  };
  const showErrorNotification = (message) => {
    _showNotification(message, "error");
  };

  const showSuccessNotification = (message) => {
    _showNotification(message, "success");
  };

  return (
    <>
      <Notification notification={notification}></Notification>
      {!user && (
        <LoginForm
          onLogin={(user) => {
            storageService.storeUser(user);
            setUser(user);
            showSuccessNotification(`Logged in!`);
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
              showSuccessNotification(`Logged out!`);
            }}
          ></User>
          <AddBlogForm
            onBlogAdded={(blog) => {
              setBlogs(blogs.concat(blog));
              showSuccessNotification(`Blog added ${blog.title}`);
            }}
            onError={(error) => {
              showErrorNotification(error);
            }}
          ></AddBlogForm>
          <BlogsList blogs={blogs}></BlogsList>
        </>
      )}      
    </>
  );
};

export default App;
