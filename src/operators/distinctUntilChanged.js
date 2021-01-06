import stack from './stack';
import filter from './filter';
import map from './map';
import pipeable from './pipeable';
import { equality } from './utils';

export default comparator =>
  pipeable(
    stack(),
    filter(
      e => e.length == 1 || !(comparator || equality).apply(null, e.slice(-2)),
    ),
    map(e => e.pop()),
  );
