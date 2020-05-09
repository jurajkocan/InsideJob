import { Filters } from "src/api/types/Filters";

export const PeopleListFilter: Filters = [
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
