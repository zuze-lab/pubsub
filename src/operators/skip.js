import stack from './stack';
import map from './map';
import createPipeOperator from './createPipeOperator';
export default createPipeOperator(times => [
  stack(times + 1),
  map(e => e.pop()),
]);
