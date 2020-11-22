import { pipeableInterrupt } from './utils';
import stack from './stack';
import filter from './filter';
import map from './map';

export default (size, every) =>
  pipeableInterrupt(
    stack(),
    filter(
      e => (!size || e.length >= size) && (!every || e.length % every === 0),
    ),
    map(e => e.slice(size * -1)),
  );
