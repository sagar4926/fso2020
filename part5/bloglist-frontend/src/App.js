import React, { useEffect, useState } from "react";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import User from "./components/User";
import storageService from "./services/storage";

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
      {user && <>
        <User
          user={user}
          onLogout={() => {
            storageService.removeUser();
            setUser(undefined);
          }}
        ></User>
        <Blogs blogs={blogs}></Blogs>,
      </>}
    </>
  );
};

export default App;
