import createPipeOperator from './createPipeOperator';
import stack from './stack';
import filter from './filter';
import map from './map';

export default createPipeOperator((comparator = (a, b) => a === b) => [
  stack(),
  filter(e => e.length == 1 || !comparator.apply(null, e.slice(-2))),
  map(e => e.pop()),
]);
