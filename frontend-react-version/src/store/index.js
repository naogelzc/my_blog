import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import combineReducers from "./combineReducers";
import thunk from "redux-thunk";

const store = configureStore(
  { reducer: combineReducers },
  applyMiddleware(thunk)
);

export default store;
