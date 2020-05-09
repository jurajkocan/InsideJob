import { parse as parseQuery, stringify as stringifyQuery } from "query-string";
import { parse } from "path";

export const updateQuery = (url: string, key: string, value: any) => {
  const parsed = parseQuery(url);
  parsed[key] = value;
  return stringifyQuery(parsed);
};
