import React from "react";
import useField from "../hooks/UseField";

const CreateAnecdoteForm = (props) => {
  const { reset: content_reset, ...content } = useField("content");
  const { reset: author_reset, ...author } = useField("author");
  const { reset: info_reset, ...info } = useField("info");
  const resets = [content_reset, author_reset, info_reset];

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    resets.forEach((reset) => reset());
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type="reset">clear</button>
      </form>
    </div>
  );
};

export default CreateAnecdoteForm;
