import createPipeOperator from './createPipeOperator';
import stack from './stack';
import filter from './filter';
import map from './map';

export default createPipeOperator((size, every) => [
  stack(),
  filter(
    e => (!size || e.length >= size) && (!every || e.length % every === 0),
  ),
  map(e => e.slice(size * -1)),
]);
