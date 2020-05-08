import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import PeopleReducer from "./reducers/PeopleReducer";
import { State, defaultState } from "./States";
import { Actions } from "./ActionTypes";

declare const window: any;

const appliedReduxMiddleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  trace: true,
  traceLimit: 25,
})(applyMiddleware(createLogger()));

export const store = createStore<State, Actions, {}, {}>(
  combineReducers({
    user: PeopleReducer,
  }),
  defaultState,
  appliedReduxMiddleware
);
