import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "../reducers/notificationsReducer";
import thunk from "redux-thunk";

const reducer = combineReducers({
  notifications: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;
