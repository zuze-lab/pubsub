import filter from './filter';
import pipeable from './pipeable';
export default (n, c = 0) => pipeable(filter(() => c++ >= n));
