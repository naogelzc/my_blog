import types from "./actionTypes";
const locale = navigator.language.split(/[-_]/)[0];
const initState = locale === "zh" ? "zhCN" : "enUS";

const langReducer = (state = initState, action) => {
  switch (action.type) {
    case types.SET_LANG:
      if (state === "enUS") return "zhCN";
      else return "enUS";
    default:
      return state;
  }
};
export default langReducer;
