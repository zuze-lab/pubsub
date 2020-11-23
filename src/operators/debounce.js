import createOperator from './createOperator';

export default createOperator(
  (by, leading, canCall = true, to) => next => (...args) => {
    if (leading && canCall) next(...args);
    canCall = false;
    clearTimeout(to);
    to = setTimeout(() => {
      canCall = true;
      leading || next(...args);
    }, by);
  },
);
