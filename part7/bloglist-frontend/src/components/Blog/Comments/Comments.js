import React from "react";
import AddCommentForm from "./AddCommentForm";

const Comments = ({ blog }) => {
  return (
    <div>
      <h4>Comments</h4>
      <AddCommentForm blog_id={blog.id}/>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
