import createOperator from './createOperator';

export default createOperator((times, count = 0) => next => (...args) =>
  ++count <= times && next(...args),
);
