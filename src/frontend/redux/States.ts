import { People, Person } from "src/api/types/People";

export type PersonState = {
  list: People | null;
  detail: Person | null;
  peopleListFetching: boolean;
  personFetching: boolean;
  err: any;
};

export type AppState = {
  isMobile: boolean;
};

export type State = {
  person: PersonState;
  app: AppState;
};

export const defaultState: State = {
  app: {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),
  },
  person: {
    detail: null,
    list: null,
    peopleListFetching: false,
    personFetching: false,
    err: null,
  },
};
