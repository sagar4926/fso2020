import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BlogsList = () => {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((l, r) => r.likes - l.likes)
  );
  const user = useSelector((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <Container id="blog-list">
      <Typography component="h1" variant="h3">
        Blogs
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id} className="blog">
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default BlogsList;
