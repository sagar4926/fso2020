import React from "react";
import Blog from "./Blog";

const BlogsList = ({ blogs, onLike }) => (
  <div>
    <h2>blogs</h2>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} onLike={onLike} />
    ))}
  </div>
);

export default BlogsList;
