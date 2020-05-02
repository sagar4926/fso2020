import { Container, Fab, makeStyles, Typography } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteBlog, likeBlog } from "../../redux/reducers/blogsReducer";
import Comments from "./Comments/Comments";


const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));
const Blog = () => {
  const classes = useStyles();
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
    <Container className="blog">
      <Typography component="h1" variant="h3">
        {blog.title} : {blog.author}
      </Typography>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <Typography component="h1" variant="h6">
        likes {blog.likes}
      </Typography>
      <Fab
        id="btn-blog-like"
        color="secondary"
        onClick={() => {
          dispatch(likeBlog(blog));
        }}
        className={classes.fab}
      >
        <FavoriteBorderIcon />
      </Fab>
      <br></br>
      {blog.user ? `Added by: ${blog.user.name}` : null}
      <Comments blog={blog} />
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
    </Container>
  );
};

export default Blog;
