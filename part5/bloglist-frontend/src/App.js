import React, { useEffect, useState } from "react";
import BlogsList from "./components/BlogsList";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import User from "./components/User";
import storageService from "./services/storage";
import AddBlogForm from "./components/AddBlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    setUser(storageService.getUser());
  }, []);

  return (
    <>
      {!user && (
        <LoginForm
          onLogin={(user) => {
            storageService.storeUser(user);
            setUser(user);
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
            }}
          ></User>
          <AddBlogForm
            onBlogAdded={(blog) => {
              setBlogs(blogs.concat(blog));
            }}
          ></AddBlogForm>
          <BlogsList blogs={blogs}></BlogsList>,
        </>
      )}
    </>
  );
};

export default App;
