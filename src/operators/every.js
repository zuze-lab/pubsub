export default (size, c = 0) => next => r => !(++c % size) && next(r);
