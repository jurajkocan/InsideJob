import { People, Person } from "src/api/types/People";

export type UserState = {
  list: People | null;
  detail: Person | null;
  peopleListFetching: boolean;
};

export type State = {
  user: UserState;
};

export const defaultState: State = {
  user: {
    detail: null,
    list: null,
    peopleListFetching: false,
  },
};
