import blogs from "../../services/blogs";
import { addNotification } from "./notificationsReducer";

const ACTIONS = {
  INIT: "INIT_BLOGS",
  ADD: "ADD_BLOG",
  UPDATE: "UPDATE_BLOG",
  DELETE: "DELETE_BLOG",
  COMMENT: "BLOG_ADD_COMMENT",
};

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.INIT: {
      return action.data;
    }
    case ACTIONS.ADD: {
      return [...state, action.data];
    }
    case ACTIONS.UPDATE: {
      return state.map((blog) =>
        action.data.id === blog.id ? action.data : blog
      );
    }
    case ACTIONS.COMMENT: {
      return state.map((blog) =>
        action.data.blog === blog.id
          ? { ...blog, comments: [...blog.comments, action.data] }
          : blog
      );
    }
    case ACTIONS.DELETE: {
      return state.filter((blog) => action.data.id !== blog.id);
    }
    default: {
      return state;
    }
  }
};

export const initBlogs = () => async (dispatch) => {
  const data = await blogs.getAll();
  dispatch({
    type: ACTIONS.INIT,
    data: data,
  });
};

export const addBlog = (blog) => async (dispatch) => {
  blogs
    .create(blog)
    .then((data) => {
      dispatch({
        type: ACTIONS.ADD,
        data,
      });
      dispatch(addNotification(`Blog added ${data.title}`));
    })
    .catch(() => {
      dispatch(
        addNotification(
          "Failed to create blog. title and url is mandatory",
          "error"
        )
      );
    });
};

export const likeBlog = (blog) => async (dispatch) => {
  blogs
    .update(blog.id, { likes: blog.likes + 1 })
    .then((data) => {
      dispatch({
        type: ACTIONS.UPDATE,
        data,
      });
      dispatch(addNotification(`Blog liked ${data.title}`));
    })
    .catch(() => {
      dispatch(addNotification("Failed to like blog.", "error"));
    });
};

export const addComment = (blog_id, content) => async (dispatch) => {
  blogs
    .addComment(blog_id, { content })
    .then((data) => {
      dispatch({
        type: ACTIONS.COMMENT,
        data,
      });
      dispatch(addNotification(`Comment added ${data.content}`));
    })
    .catch((e) => {
      console.log("Error", e);
      dispatch(addNotification("Failed to add comment.", "error"));
    });
};

export const deleteBlog = (blog) => async (dispatch) => {
  const title = blog.title;
  blogs
    .delete(blog.id)
    .then(() => {
      dispatch({
        type: ACTIONS.DELETE,
        data: blog,
      });
      dispatch(addNotification(`Blog deleted: ${title}`));
    })
    .catch(() => {
      dispatch(addNotification("Failed to delete blog.", "error"));
    });
};
export default blogsReducer;
