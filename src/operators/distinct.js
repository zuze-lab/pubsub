import createOperator from './createOperator';
import pipe from './pipe';
import stack from './stack';
import map from './map';
import filter from './filter';

export default createOperator((comparator = (a, b) => a === b) => next =>
  pipe(
    stack(),
    filter(e => {
      const last = e[e.length - 1];
      return e.every((a, i) => i === e.length - 1 || !comparator(a, last));
    }),
    map(e => e.pop()),
    () => next,
  ),
);
