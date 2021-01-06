import distinct from './distinct';
import { compare } from './utils';

export default (key, comparator) =>
  distinct((a, b) => compare(comparator, a[key], b[key]));
