import React from "react";
import Blog from "./Blog/Blog";
import { useSelector, useDispatch } from "react-redux";
import { likeBlog, deleteBlog } from "../redux/reducers/blogsReducer";

const BlogsList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) =>
    [...state.blogs].sort((l, r) => r.likes - l.likes)
  );
  return (
    <div id="blog-list">
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          onLike={() => {
            dispatch(likeBlog(blog));
          }}
          onDelete={() => {
            dispatch(deleteBlog(blog));
          }}
        />
      ))}
    </div>
  );
};

export default BlogsList;
