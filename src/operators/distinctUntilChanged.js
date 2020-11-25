import stack from './stack';
import filter from './filter';
import map from './map';
import pipeable from './pipeable';

export default (comparator = (a, b) => a === b) =>
  pipeable(
    stack(),
    filter(e => e.length == 1 || !comparator.apply(null, e.slice(-2))),
    map(e => e.pop()),
  );
