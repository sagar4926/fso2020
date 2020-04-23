import React from "react";
import Blog from "./Blog/Blog";


const BlogsList = ({ blogs, onLike, onDelete }) => {
  blogs.sort((l, r) => r.likes - l.likes);
  return (
    <div id="blog-list">
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} onLike={onLike} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default BlogsList;
