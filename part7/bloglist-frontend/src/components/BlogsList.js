import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const BlogsList = () => {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((l, r) => r.likes - l.likes)
  );
  const user = useSelector((state) => state.user);
  const history = useHistory();
  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <div id="blog-list">
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="blog"
          style={{
            padding: 10,
            border: "solid",
            borderWidth: 1,
            marginBottom: 5,
          }}
        >
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> : {blog.author}
        </div>
      ))}
    </div>
  );
};

export default BlogsList;
