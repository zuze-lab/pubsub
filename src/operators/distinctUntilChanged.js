import { pipeableInterrupt } from './utils';
import stack from './stack';
import filter from './filter';
import map from './map';

export default (comparator = (a, b) => a === b) =>
  pipeableInterrupt(
    stack(),
    filter(e => e.length == 1 || !comparator(...e.slice(-2))),
    map(e => e.pop()),
  );
