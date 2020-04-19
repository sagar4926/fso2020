import React from "react";
import Togglable from "./Togglable";
const Blog = ({ blog }) => (
  <div
    style={{ padding: 10, border: "solid", borderWidth: 1, marginBottom: 5 }}
  >
    {blog.title} : {blog.author}
    <Togglable>
      <br></br>
      {blog.url} <br></br>
      likes {blog.likes} <br></br>
      {blog.user ? blog.user.name : null}
    </Togglable>
  </div>
);

export default Blog;
