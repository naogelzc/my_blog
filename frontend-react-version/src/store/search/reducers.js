import types from "./actionTypes";
const initState = "";

const searchReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_SEARCH:
      return action.val;
    default:
      return state;
  }
};
export default searchReducer;
