import createOperator from './createOperator';

export default createOperator(by => next => (...args) =>
  setTimeout(() => next(...args), by),
);
