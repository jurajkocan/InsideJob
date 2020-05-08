import { People, User } from "src/api/types/People";

export type UserState = {
  list: People | null;
  detail: User | null;
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
