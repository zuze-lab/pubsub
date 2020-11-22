import distinct from './distinct';

export default (key, comparator = (a, b) => a === b) =>
  distinct((a, b) => comparator(a[key], b[key]));
