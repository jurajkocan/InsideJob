import { defaultState, AppState } from "../States";
import { Actions, ActionTypes } from "../ActionTypes";

export default (state = defaultState.app, _action: Actions): AppState => {
  return state;
};
