import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../../redux/reducers/blogsReducer";

const AddCommentForm = ({ blog_id }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const submit = (event) => {
    event.preventDefault();
    dispatch(addComment(blog_id, comment));
  };
  return (
    <form onSubmit={submit}>
      <input
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder="Enter comment"
      ></input>
      <button type="submit">Add Comment</button>
    </form>
  );
};
export default AddCommentForm;
