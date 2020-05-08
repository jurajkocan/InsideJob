import { Dispatch } from "redux";
import { Actions, ActionTypes, AllActions } from "./ActionTypes";
import { swapi } from "src/api/Swapi";

export const dispatcher = (() => {
  return {
    fetchPeople: async (
      dispatch: Dispatch<Actions>,
      action: AllActions.FetchPeople
    ) => {
      dispatch(action);
      try {
        const response = await swapi.getPeople(
          undefined,
          action.payload.filter
        );
        dispatch({
          type: ActionTypes.FETCH_PEOPLE_SUCCESS,
          payload: response.data,
        });
      } catch (err) {
        console.log(err);
        dispatch({ type: ActionTypes.FETCH_PEOPLE_FAIL });
      }
    },
    fetchPerson: async (
      dispatch: Dispatch<Actions>,
      action: AllActions.FetchPerson
    ) => {
      const a = dispatch;
      const b = action;
    },
  };
})();
