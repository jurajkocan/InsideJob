import { Filters } from "src/api/types/Filters";

export const PeopleListFilter: Filters = [
  {
    name: "sort",
    translate: "Sort by",
    type: "radio",
    value: ["name:asc", "name:desc"],
  },
  {
    name: "gender",
    translate: "Gender",
    type: "radio",
    value: ["male", "female", "N/A"],
  },
  {
    name: "eye-color",
    translate: "Eye color",
    type: "checkbox",
    value: ["blue", "brown", "green", "yellow", "red"],
  },
];
