import { getLastParameterFromUrl, removeFromQuery } from "./QueryUtils";

test("url parameter", () => {
  const result = "1";
  expect(getLastParameterFromUrl("https://url/1/")).toBe(result);
  expect(getLastParameterFromUrl("https://url/1")).toBe(result);
  expect(getLastParameterFromUrl("https://url/suburl/1")).toBe(result);
});

test("removeFromQuery", () => {
  const resultWithNoQuery = "";
  expect(removeFromQuery("?search", "search")).toBe(resultWithNoQuery);
  expect(removeFromQuery("?search=1", "search")).toBe(resultWithNoQuery);
  expect(removeFromQuery("?search=123123", "search")).toBe(resultWithNoQuery);

  const resultWithQuery = "https%3A%2F%2Furl%3Fpage=1&pageSize=10";
  expect(removeFromQuery("https://url?page=1&pageSize=10", "search")).toBe(
    resultWithQuery
  );
  expect(
    removeFromQuery("https://url?page=1&pageSize=10&search=1", "search")
  ).toBe(resultWithQuery);
  expect(
    removeFromQuery("https://url?page=1&pageSize=10&search=", "search")
  ).toBe(resultWithQuery);
});
