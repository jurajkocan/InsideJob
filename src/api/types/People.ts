import { List } from "./List";

export type Person = {
  [key: string]: any; // for wookie translation, key name change as well...
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string | null;
  edited: string | null;
  url: string;
};

export type People = List<Person>;
