import blogs from "../../services/blogs";
import { addNotification } from "./notificationsReducer";

const ACTIONS = {
  INIT: "INIT_BLOGS",
  ADD: "ADD_BLOG",
};

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case ACTIONS.INIT: {
      return action.data;
    }
    case ACTIONS.ADD: {
      return [...state, action.data];
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

export default blogsReducer;
