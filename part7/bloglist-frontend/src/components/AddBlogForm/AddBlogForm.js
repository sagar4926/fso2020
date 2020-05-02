import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../../redux/reducers/blogsReducer";
import { TextField, Typography, Button } from "@material-ui/core";

const AddBlogForm = ({ onBlogAdded }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  if (!user) {
    return null;
  }

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  const createBlog = (event) => {
    event.preventDefault();
    dispatch(addBlog({ title, author, url }));
    onBlogAdded();
    clearForm();
  };

  return (
    <>
      <Typography variant="h5">Create blog</Typography>
      <form onSubmit={createBlog}>
        <TextField
          id="input-title"
          label="Title"
          placeholder="Enter title"
          value={title}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          onChange={({ target }) => {
            setTitle(target.value);
          }}
        />
        <TextField
          id="input-author"
          label="Author"
          placeholder="Enter author's name"
          value={author}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
        />
        <TextField
          id="input-url"
          label="Url"
          placeholder="Enter url"
          value={url}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          onChange={({ target }) => {
            setUrl(target.value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          margin="normal"
        >
          Create
        </Button>
      </form>
    </>
  );
};
export default AddBlogForm;
