import { defaultState, UserState } from "../States";
import { Actions, ActionTypes } from "../ActionTypes";

export default (state = defaultState.user, action: Actions): UserState => {
  switch (action.type) {
    case ActionTypes.FETCH_PEOPLE:
      return {
        ...state,
        peopleListFetching: true,
      };

    case ActionTypes.FETCH_PEOPLE_SUCCESS:
      return {
        ...state,
        list: action.payload,
        peopleListFetching: false,
      };
    case ActionTypes.FETCH_PEOPLE_FAIL:
      return {
        ...state,
        peopleListFetching: false,
      };
    default:
      return state;
  }
};
