import createOperator from './createOperator';

export default createOperator(fn => next => (...args) =>
  next.apply(null, (fn.apply(null, args), args)),
);
