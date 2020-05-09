import { defaultState, PersonState } from "../States";
import { Actions, ActionTypes } from "../ActionTypes";

export default (state = defaultState.person, action: Actions): PersonState => {
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
        err: action.payload.err,
        list: null,
        peopleListFetching: false,
      };

    case ActionTypes.FETCH_PERSON:
      return {
        ...state,
        personFetching: true,
      };

    case ActionTypes.FETCH_PERSON_SUCCESS:
      return {
        ...state,
        detail: action.payload,
        personFetching: false,
      };
    case ActionTypes.FETCH_PERSON_FAIL:
      return {
        ...state,
        err: action.payload.err,
        detail: null,
        personFetching: false,
      };
    default:
      return state;
  }
};
