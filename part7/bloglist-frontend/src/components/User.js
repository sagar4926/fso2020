import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import { List, ListItem, ListItemText, ListItemIcon, Typography, Container } from "@material-ui/core";
import BookIcon from "@material-ui/icons/Book";

const User = () => {
  const { id } = useParams();
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  );

  if (!user) {
    return null;
  }

  return (
    <Container>
      <Typography variant="h3">{user.name}</Typography>
      <Typography variant="h6">Added blogs</Typography>
      <List>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary={blog.title}></ListItemText>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};
export default User;
