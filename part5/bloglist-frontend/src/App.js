import React, { useEffect, useState, useRef } from "react";
import BlogsList from "./components/BlogsList";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import User from "./components/User";
import storageService from "./services/storage";
import AddBlogForm from "./components/AddBlogForm/AddBlogForm";
import Notification from "./components/notification/Notification";
import Togglable from "./components/Togglable";
import blogsApi from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(undefined);
  const [notification, setNotification] = useState(undefined);
  // Using this over React.createRef persists the ref across state changes and re-renders
  const blogFormRef = useRef(null);

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

  const blogAdded = (data) => {
    blogsApi
      .create(data)
      .then((blog) => {
        // If you call this after setBlogs, the ref is lost
        setBlogs(blogs.concat(blog));
        showSuccessNotification(`Blog added ${blog.title}`);
        blogFormRef.current.toggleVisiblity();
      })
      .catch(() => {
        showErrorNotification(
          "Failed to create blog. title and url is mandatory"
        );
      });
  };

  const blogLiked = (blog) => {
    blogsApi
      .update(blog.id, { likes: blog.likes + 1 })
      .then((updatedBlog) => {
        const updatedBlogs = blogs.map((b) =>
          b.id === updatedBlog.id ? updatedBlog : b
        );
        setBlogs(updatedBlogs);
        showSuccessNotification(`Blog liked: ${blog.title}`);
      })
      .catch(() => {
        showErrorNotification("Failed to like blog.");
      });
  };

  const blogDeleted = (blog) => {
    const title = blog.title;
    blogsApi
      .delete(blog.id)
      .then(() => {
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        showSuccessNotification(`Blog deleted: ${title}`);
      })
      .catch(() => {
        showErrorNotification("Failed to delete blog.");
      });
  };

  return (
    <>
      <Notification notification={notification}></Notification>
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
