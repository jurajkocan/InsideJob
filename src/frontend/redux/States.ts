import { People, Person } from "src/api/types/People";

export type PersonState = {
  list: People | null;
  detail: Person | null;
  peopleListFetching: boolean;
  personFetching: boolean;
  err: any;
};

export type State = {
  person: PersonState;
};

export const defaultState: State = {
  person: {
    detail: null,
    list: null,
    peopleListFetching: false,
    personFetching: false,
    err: null,
  },
};
