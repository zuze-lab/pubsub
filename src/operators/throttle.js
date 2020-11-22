import createOperator from './createOperator';

export default createOperator((by, canCall = true) => next => (...args) => {
  canCall && next(...args);
  canCall = false;
  setTimeout(() => (canCall = true), by);
});
