import React from "react";
import Togglable from "../Togglable";
import storageService from "../../services/storage";
import PropTypes from "prop-types";

const Blog = ({ blog, onLike, onDelete }) => {
  const user = storageService.getUser();

  console.log("User ", user);
  console.log("Blog ", blog);

  return (
    <div
      className="blog"
      style={{ padding: 10, border: "solid", borderWidth: 1, marginBottom: 5 }}
    >
      {blog.title} : {blog.author}
      <Togglable>
        <br></br>
        {blog.url} <br></br>
        likes {blog.likes}{" "}
        <button
          id="btn-blog-like"
          onClick={() => {
            onLike(blog);
          }}
        >
          Like
        </button>
        <br></br>
        {blog.user ? blog.user.name : null}
        {blog.user && blog.user.id === user.id && (
          <button
            id="btn-blog-delete"
            onClick={() => {
              if (
                window.confirm(`Are you sure you want to remove ${blog.title}`)
              ) {
                onDelete(blog);
              }
            }}
          >
            Delete
          </button>
        )}
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Blog;
