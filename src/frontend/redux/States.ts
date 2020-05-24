import { People, Person } from "src/api/types/People";
import { Languages } from "src/types/Common";

export type AppTheme = "light" | "dark";

export type PersonState = {
  list: People | null;
  detail: Person | null;
  peopleListFetching: boolean;
  personFetching: boolean;
  err: any;
};

export type AppState = {
  isMobile: boolean;
  language: Languages;
  theme: AppTheme;
};

export type State = {
  person: PersonState;
  app: AppState;
};

export type PartialState = {
  [key in keyof State]?: Partial<State[key]>;
};

export const defaultState: State = {
  app: {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ),
    language: "en-US",
    theme: "light",
  },
  person: {
    detail: null,
    list: null,
    peopleListFetching: false,
    personFetching: false,
    err: null,
  },
};
