import createOperator from './createOperator';
import pipe from './pipe';
import map from './map';
import bufferCount from './bufferCount';

export default createOperator(size => next =>
  pipe(
    bufferCount(1, size),
    map(e => e.pop()),
    () => next,
  ),
);
