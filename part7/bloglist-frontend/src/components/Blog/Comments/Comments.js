import React from "react";
import AddCommentForm from "./AddCommentForm";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

const Comments = ({ blog }) => {
  return (
    <Container>
      <Typography variant="h5">Comments</Typography>
      <AddCommentForm blog_id={blog.id} />
      <List>
        {blog.comments.map((comment) => (
          <ListItem key={comment.id}>
            <ListItemIcon>
              <ChatBubbleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary={comment.content}></ListItemText>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Comments;
