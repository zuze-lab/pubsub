import createOperator from './createOperator';

export default createOperator((minSize, maxSize) => {
  const es = [];
  return next => (...args) => {
    es.push(...args);
    if (!minSize || es.length >= +minSize) next(es.slice(maxSize * -1));
  };
});
