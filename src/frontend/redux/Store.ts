import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import PeopleReducer from "./reducers/PeopleReducer";
import { State, defaultState, PartialState } from "./States";
import { Actions } from "./ActionTypes";
import AppReducer from "./reducers/AppReducer";
import { map, fold } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { getFromLocalStorage } from "src/utils/LocalStorageUtils";

declare const window: any;

const appliedReduxMiddleware =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    trace: true,
    traceLimit: 25,
  })(applyMiddleware(createLogger()));

const partialState = pipe(
  getFromLocalStorage("partialState"),
  map((data) => {
    return JSON.parse(data) as PartialState;
  }),
  fold(
    (_err) => {
      // wheen there is no key in local storage or can not parse correctly just return default state so app will work
      return defaultState;
    },
    (data) => {
      return data;
    }
  )
);

const state: State = {
  person: {
    ...defaultState.person,
    ...partialState.person,
  },
  app: {
    ...defaultState.app,
    ...partialState.app,
  },
};

export const store = createStore<State, Actions, {}, {}>(
  combineReducers({
    person: PeopleReducer,
    app: AppReducer,
  }),
  state,
  process.env.NODE_ENV !== "production" ? appliedReduxMiddleware : undefined
);

store.subscribe(() => {
  const state = store.getState();
  const stateToPersist: PartialState = {
    app: {
      language: state.app.language,
      theme: state.app.theme,
    },
  };
  localStorage.setItem("partialState", JSON.stringify({ ...stateToPersist }));
});
