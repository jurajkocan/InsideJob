import { parse as parseQuery, stringify as stringifyQuery } from "query-string";

export const updateQuery = (url: string, key: string, value: any) => {
  const parsed = parseQuery(url);
  parsed[key] = value;
  return stringifyQuery(parsed);
};

export const removeFromQuery = (url: string, key: string) => {
  const parsed = parseQuery(url);
  delete parsed[key];
  return stringifyQuery(parsed);
};

export const getLastParameterFromUrl = (url: string) => {
  const [lastButOneParam, lastParam] = url.split("/").slice(-2);
  if (lastParam !== "") return lastParam;
  return lastButOneParam;
};
