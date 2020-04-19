import React, { useEffect, useState } from "react";
import Blogs from "./components/Blogs";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import User from "./components/User";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <>
      {!user && (
        <LoginForm
          onLogin={(user) => {
            console.log("User Logged in ", user);
            setUser(user);
          }}
        ></LoginForm>
      )}
      {user && [<User user={user}></User>, <Blogs blogs={blogs}></Blogs>]}
    </>
  );
};

export default App;
