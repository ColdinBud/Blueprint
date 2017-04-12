import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { testAreaReducer } from './testArea';

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  // your reducer here
  testArea: testAreaReducer
});