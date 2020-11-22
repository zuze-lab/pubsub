import createOperator from './createOperator';
import pipe from './pipe';
import stack from './stack';
import filter from './filter';
import map from './map';

export default createOperator((comparator = (a, b) => a === b) => next =>
  pipe(
    stack(),
    filter(e => e.length == 1 || !comparator(...e.slice(-2))),
    map(e => e.pop()),
    () => next,
  ),
);
