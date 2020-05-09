import { Filters } from "./Filters";

export type List<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  filters: Filters;
  results: T[];
};
