import createOperator from './createOperator';

export default createOperator(f => next => (...args) =>
  f(...args) && next(...args),
);
