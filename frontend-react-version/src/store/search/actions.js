import types from "./actionTypes.js";

export const updateSearch = (val) => {
  return {
    type: types.SET_SEARCH,
    val: val,
  };
};
