import createOperator from './createOperator';
import pipe from './pipe';
import stack from './stack';
import filter from './filter';
import map from './map';

export default createOperator((size, every) => next =>
  pipe(
    stack(),
    filter(
      e => (!size || e.length >= size) && (!every || e.length % every === 0),
    ),
    map(e => e.slice(size * -1)),
    () => next,
  ),
);
