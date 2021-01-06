import stack from './stack';
import map from './map';
import filter from './filter';
import pipeable from './pipeable';
import { compare } from './utils';

export default comparator =>
  pipeable(
    stack(),
    filter(e => {
      const last = e[e.length - 1];
      return e.every(
        (a, i) => i === e.length - 1 || !compare(comparator, a, last),
      );
    }),
    map(e => e.pop()),
  );
