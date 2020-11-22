import createOperator from './createOperator';

export default createOperator((startAt = 0) => next => (...args) =>
  next(startAt++, ...args),
);
