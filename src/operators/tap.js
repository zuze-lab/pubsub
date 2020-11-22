import createOperator from './createOperator';

export default createOperator(fn => next => (...args) => {
  fn(...args);
  next(...args);
});
