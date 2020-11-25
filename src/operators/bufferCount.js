import stack from './stack';
import filter from './filter';
import map from './map';
import pipeable from './pipeable';

export default (size, every) =>
  pipeable(
    stack(),
    filter(
      e => (!size || e.length >= size) && (!every || e.length % every === 0),
    ),
    map(e => e.slice(size * -1)),
  );
