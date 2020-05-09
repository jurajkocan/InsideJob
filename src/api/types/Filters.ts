export type FilterType = "radio" | "checkbox";

export type Filters = {
  type: FilterType;
  name: string;
  translate: string;
  value: string[];
}[];
