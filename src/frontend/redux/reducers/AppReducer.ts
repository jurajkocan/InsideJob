import { defaultState, AppState } from "../States";
import { Actions, ActionTypes } from "../ActionTypes";

export default (state = defaultState.app, action: Actions): AppState => {
  switch (action.type) {
    case ActionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case ActionTypes.CHANGE_THEME:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};
