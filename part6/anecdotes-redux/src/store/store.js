import { createStore, combineReducers } from "redux";
import anecdotesReducer from "../reducers/anecdoteReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "../reducers/notificationReducer";

const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  notification: notificationReducer,
});
const store = createStore(reducer, composeWithDevTools());
export default store;
