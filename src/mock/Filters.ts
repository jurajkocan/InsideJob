import { Filters } from "src/api/types/Filters";

export const PeopleListFilter: { [key in "en" | "wookiee"]: Filters } = {
  en: [
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
  ],
  wookiee: [
    {
      name: "sort",
      translate: "Coorcao rhro",
      type: "radio",
      value: ["whrascwo:racoa", "whrascwo:wawocoa"],
    },
    {
      name: "gender",
      translate: "Rrwowhwaworc",
      type: "radio",
      value: ["scraanwo", "wwwoscraanwo", "WH/RA"],
    },
    {
      name: "eye-color",
      translate: "Worowo oaooanoorc",
      type: "checkbox",
      value: ["rhanhuwo", "rhrcooohwh", "rrrcwowowh", "rowoananoh", "rcwowa"],
    },
  ],
};
