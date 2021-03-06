import { People, Person } from "src/api/types/People";
import { Action } from "redux";
import { Languages } from "src/types/Common";
import { AppTheme } from "./States";

export enum ActionTypes {
  FETCH_PEOPLE = "FETCH_PEOPLE",
  FETCH_PEOPLE_SUCCESS = "FETCH_PEOPLE_SUCCESS",
  FETCH_PEOPLE_FAIL = "FETCH_PEOPLE_FAIL",

  FETCH_PERSON = "FETCH_PERSON",
  FETCH_PERSON_SUCCESS = "FETCH_PERSON_SUCCESS",
  FETCH_PERSON_FAIL = "FETCH_PERSON_FAIL",

  FETCH_FILMS = "FETCH_FILMS",
  FETCH_FILMS_SUCCESS = "FETCH_FILMS_SUCCESS",
  FETCH_FILMS_FAIL = "FETCH_FILMS_FAIL",

  FETCH_FILM = "FETCH_FILM",
  FETCH_FILM_SUCCESS = "FETCH_FILM_SUCCESS",
  FETCH_FILM_FAIL = "FETCH_FILM_FAIL",

  FETCH_STARSHIPS = "FETCH_STARSHIPS",
  FETCH_STARSHIPS_SUCCESS = "FETCH_STARSHIPS_SUCCESS",
  FETCH_STARSHIPS_FAIL = "FETCH_STARSHIPS_FAIL",

  FETCH_STARSHIP = "FETCH_STARSHIP",
  FETCH_STARSHIP_SUCCESS = "FETCH_STARSHIP_SUCCESS",
  FETCH_STARSHIP_FAIL = "FETCH_STARSHIP_FAIL",

  CHANGE_LANGUAGE = "CHANGE_LANGUAGE",
  CHANGE_THEME = "CHANGE_THEME",
}

export namespace AllActions {
  export type FetchPeople = {
    type: ActionTypes.FETCH_PEOPLE;
    payload: {
      filter?: string;
    };
  };
  export type FetchPeopleSuccess = {
    type: ActionTypes.FETCH_PEOPLE_SUCCESS;
    payload: People;
  };

  export type FetchPeopleFail = {
    type: ActionTypes.FETCH_PEOPLE_FAIL;
    payload: {
      err: any;
    };
  };

  export type FetchPerson = {
    type: ActionTypes.FETCH_PERSON;
    payload: {
      id: number;
    };
  };

  export type FetchPersonSuccess = {
    type: ActionTypes.FETCH_PERSON_SUCCESS;
    payload: Person;
  };

  export type FetchPersonFail = {
    type: ActionTypes.FETCH_PERSON_FAIL;
    payload: {
      err: any;
    };
  };

  export type ChangeLanguage = {
    type: ActionTypes.CHANGE_LANGUAGE;
    payload: Languages;
  };
  export type ChangeTheme = {
    type: ActionTypes.CHANGE_THEME;
    payload: AppTheme;
  };
}

export type Actions =
  | AllActions.FetchPeople
  | AllActions.FetchPeopleSuccess
  | AllActions.FetchPeopleFail
  | AllActions.FetchPerson
  | AllActions.FetchPersonSuccess
  | AllActions.FetchPersonFail
  | AllActions.ChangeLanguage
  | AllActions.ChangeTheme;
