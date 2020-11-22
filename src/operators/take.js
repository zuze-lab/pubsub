import createOperator from './createOperator';

export default createOperator(times => {
  let count = 0;
  return next => (...args) => {
    ++count <= times && next(...args);
  };
});
