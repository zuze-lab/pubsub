export const pipe = (...fns) =>
  fns.reduceRight((acc, fn) => fn(acc), fns[fns.length - 1]);

export default () => pipe;
