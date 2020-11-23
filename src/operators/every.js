import createPipeOperator from './createPipeOperator';
import map from './map';
import bufferCount from './bufferCount';

export default createPipeOperator(size => [
  bufferCount(1, size),
  map(e => e.pop()),
]);
