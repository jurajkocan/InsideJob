const Box = <T>(x: T): Box<T> => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  inspect: () => `Box(${x})`,
});

type Box<T> = {
  map: <K>(f: (x: T) => K) => Box<K>;
  fold: <K>(f: (x: T) => K) => K;
  inspect: () => string;
};

export default Box;
