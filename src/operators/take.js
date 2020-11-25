import pipeable from './pipeable';
import filter from './filter';

export default (n, c = 0) => pipeable(filter(() => ++c <= n));
