export const callThenable = (what, then) =>
  what && typeof what.then === 'function' ? what.then(then) : then(what);

export const identity = a => a;
export const equality = (a, b) => a === b;

export const compare = (comparator, a, b) => (comparator || equality)(a, b);

export const array = comparator => (a, b) =>
  a.length === b.length && a.every((m, i) => compare(comparator, m, b[i]));

export const unordered = transform => (a, b) => {
  if (a.length !== b.length) return false;
  const s = new Set(b.map(transform || identity));
  return a.every(m => s.has((transform || identity)(m)));
};

export const shallow = comparator => (a, b) => {
  if (!a || !b) return false;
  const aKeys = Object.keys(a);
  return (
    aKeys.length === Object.keys(b).length &&
    aKeys.every(k => compare(comparator, a[k], b[k]))
  );
};
