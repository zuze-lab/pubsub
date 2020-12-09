export const callThenable = (what, then) =>
  what && typeof what.then === 'function' ? what.then(then) : then(what);

export const equality = (a, b) => a === b;

export const compare = (comparator, a, b) => (comparator || equality)(a, b);
