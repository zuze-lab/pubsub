import filter from './filter';
import pipeable from './pipeable';

export default (size, c = 0) => pipeable(filter(() => !(++c % size)));
