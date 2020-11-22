import stack from './stack';
import map from './map';
import createOperator from './createOperator';
import pipe from './pipe';
export default createOperator(times => next =>
  pipe(
    stack(times + 1),
    map(e => e.pop()),
    () => next,
  ),
);
