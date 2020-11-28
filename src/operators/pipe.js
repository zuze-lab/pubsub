export const pipe = (...fns) => {
  const p = fns.reduceRight((acc, fn) => fn(acc), fns[fns.length - 1]);
  return r => {
    p(r);
  };
};

export default () => pipe;
