export const callThenable = (what, then) =>
  what && typeof what.then === 'function' ? what.then(then) : then(what);
