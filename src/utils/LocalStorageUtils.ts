import { Either, left, right } from "fp-ts/lib/Either";

export const getFromLocalStorage = (key: string): Either<Error, string> => {
  const data = localStorage.getItem(key);
  return !data
    ? left(new Error(`no such key in local storage, key: ${key}`))
    : right(data);
};
