import { defaultState } from "../States";
import { Actions, ActionTypes } from "../ActionTypes";

export default (state = defaultState.user, action: Actions) => {
  switch (action.type) {
    case ActionTypes.FETCH_PEOPLE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
