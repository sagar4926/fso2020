import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../../redux/reducers/blogsReducer";
import { Button, TextField } from "@material-ui/core";

const AddCommentForm = ({ blog_id }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const submit = (event) => {
    event.preventDefault();
    dispatch(addComment(blog_id, comment));
    setComment("");
  };
  return (
    <form onSubmit={submit} style={{ display: "inline-flex" }}>
      <TextField
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Enter comment"
      ></TextField>
      <Button
        variant="outlined"
        type="submit"
        style={{ alignSelf: "center", marginLeft: 10 }}
      >
        Add Comment
      </Button>
    </form>
  );
};
export default AddCommentForm;
