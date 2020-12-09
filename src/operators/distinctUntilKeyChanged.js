import distinctUntilChanged from './distinctUntilChanged';
import { compare } from './utils';

export default (key, comparator) =>
  distinctUntilChanged((a, b) => compare(comparator, a[key], b[key]));
