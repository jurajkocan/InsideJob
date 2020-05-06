import { createStore, combineReducers } from "redux";
import PeopleReducer from "./reducers/PeopleReducer";
import { State, defaultState } from "./States";
import { Actions } from "./ActionTypes";

export const store = createStore<State, Actions, {}, {}>(
  combineReducers({
    user: PeopleReducer,
  }),
  defaultState
);
