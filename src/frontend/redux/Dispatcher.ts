import { Dispatch } from "redux";
import { Actions, ActionTypes, AllActions } from "./ActionTypes";
import { swapi } from "src/api/Swapi";
import { PeopleListFilter } from "src/mock/Filters";

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
          payload: {
            ...response.data,
            filters: PeopleListFilter, // MOCK FILTERS SINCE THERE ARE NO FILTERS IN API
          },
        });
      } catch (err) {
        console.log(err);
        dispatch({
          type: ActionTypes.FETCH_PEOPLE_FAIL,
          payload: { err: err },
        });
      }
    },
    fetchPerson: async (
      dispatch: Dispatch<Actions>,
      action: AllActions.FetchPerson
    ) => {
      dispatch(action);
      try {
        const response = await swapi.getPeople(action.payload.id);
        dispatch({
          type: ActionTypes.FETCH_PERSON_SUCCESS,
          payload: response.data,
        });
      } catch (err) {
        console.log(err);
        dispatch({
          type: ActionTypes.FETCH_PERSON_FAIL,
          payload: { err: err },
        });
      }
    },
  };
})();
