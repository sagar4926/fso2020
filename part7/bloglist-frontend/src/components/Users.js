import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  TableHead,
  TableRow,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableBody,
} from "@material-ui/core";

const Users = () => {
  const users = useSelector((state) => state.users);

  return (
    <Container id="blog-list">
      <Typography component="h1" variant="h3">
        Users
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
export default Users;
