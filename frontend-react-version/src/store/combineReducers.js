import { combineReducers } from "redux";
import langReducer from "./lang/reducers.js";
import searchReducer from "./search/reducers.js";
export default combineReducers({
  lang: langReducer,
  search: searchReducer,
});
