import { combineReducers } from "redux";
import langReducer from "./lang/reducers.js";
export default combineReducers({
  lang: langReducer,
});
