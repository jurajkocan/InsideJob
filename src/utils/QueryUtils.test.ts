import { getLastParameterFromUrl } from "./QueryUtils";

test("url parameter", () => {
  const result = "1";
  expect(getLastParameterFromUrl("http://url/1/")).toBe(result);
  expect(getLastParameterFromUrl("http://url/1")).toBe(result);
});
