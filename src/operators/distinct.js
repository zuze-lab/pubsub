import { pipeableInterrupt } from './utils';
import stack from './stack';
import map from './map';
import filter from './filter';

export default (comparator = (a, b) => a === b) =>
  pipeableInterrupt(
    stack(),
    filter(e => {
      const last = e[e.length - 1];
      return e.every((a, i) => i === e.length - 1 || !comparator(a, last));
    }),
    map(e => e.pop()),
  );
