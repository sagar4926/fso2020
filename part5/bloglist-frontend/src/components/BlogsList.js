import React from "react";
import Blog from "./Blog";

const BlogsList = ({ blogs, onLike }) => {
  blogs.sort((l, r) => r.likes - l.likes);
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onLike={onLike} />
      ))}
    </div>
  );
};

export default BlogsList;
