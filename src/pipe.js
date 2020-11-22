export default (...fns) =>
  fns.reduceRight((acc, fn) => fn(acc), fns[fns.length - 1]);
