import React, { useEffect, useRef, useState } from "react";
import AddBlogForm from "./components/AddBlogForm/AddBlogForm";
import BlogsList from "./components/BlogsList";
import LoginForm from "./components/LoginForm";
import Notifications from "./components/Notifications/Notifications";
import Togglable from "./components/Togglable";
import User from "./components/User";
import { default as blogsApi, default as blogService } from "./services/blogs";
import storageService from "./services/storage";
import { addNotification } from "./reducers/notificationsReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(undefined);
  // Using this over React.createRef persists the ref across state changes and re-renders
  const blogFormRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    setUser(storageService.getUser());
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
