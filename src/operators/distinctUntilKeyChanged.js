import distinctUntilChanged from './distinctUntilChanged';

export default (key, comparator = (a, b) => a === b) =>
  distinctUntilChanged((a, b) => comparator(a[key], b[key]));
