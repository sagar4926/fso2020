import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteBlog, likeBlog } from "../../redux/reducers/blogsReducer";

const Blog = () => {
  const { id } = useParams();
  const { user, blog } = useSelector((state) => ({
    user: state.user,
    blog: state.blogs.find((blog) => blog.id === id),
  }));
  const dispatch = useDispatch();

  if (!user || !blog) {
    return null;
  }

  return (
    <div className="blog">
      <h2>
        {blog.title} : {blog.author}
      </h2>
      <br></br>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>{" "}
      <br></br>
      likes {blog.likes}{" "}
      <button
        id="btn-blog-like"
        onClick={() => {
          dispatch(likeBlog(blog));
        }}
      >
        Like
      </button>
      <br></br>
      {blog.user ? `Added by: ${blog.user.name}` : null}
      <div>
        <h4>Comments</h4>
        <ul>
          {blog.comments.map(comment =>  <li key={comment.id}>{comment.content}</li>)}
        </ul>
      </div>
      {blog.user && blog.user.id === user.id && (
        <button
          id="btn-blog-delete"
          onClick={() => {
            if (
              window.confirm(`Are you sure you want to remove ${blog.title}`)
            ) {
              dispatch(deleteBlog(blog));
            }
          }}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default Blog;
