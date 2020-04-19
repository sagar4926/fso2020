import React, { useState } from "react";

const AddBlogForm = ({ onBlogAdded }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const clearForm = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  const createBlog = (event) => {
    event.preventDefault();
    onBlogAdded({ title, author, url });
    clearForm();
  };

  return (
    <>
      <h3>Create New</h3>
      <form onSubmit={createBlog}>
        <label style={{ display: "block" }}>
          Title:
          <input
            value={title}
            onChange={({ target }) => {
              setTitle(target.value);
            }}
            placeholder="Enter title"
          ></input>
        </label>
        <label style={{ display: "block" }}>
          Author:
          <input
            value={author}
            onChange={({ target }) => {
              setAuthor(target.value);
            }}
            placeholder="Enter author"
          ></input>
        </label>
        <label style={{ display: "block" }}>
          Url:
          <input
            value={url}
            onChange={({ target }) => {
              setUrl(target.value);
            }}
            placeholder="Enter url"
          ></input>
        </label>
        <button type="submit">Create</button>
      </form>
    </>
  );
};
export default AddBlogForm;
