import createOperator from './createOperator';

export default createOperator((by, to) => next => (...args) => {
  clearTimeout(to);
  to = setTimeout(() => next(...args), by);
});
