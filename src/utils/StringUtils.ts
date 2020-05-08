export const getLastParameterFromUrl = (url: string) => {
  const [lastButOneParam, lastParam] = url.split("/").slice(-2);
  if (lastParam !== "") return lastParam;
  return lastButOneParam;
};
