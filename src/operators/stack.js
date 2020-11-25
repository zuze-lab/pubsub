export default (minSize, maxSize, es = []) => next => r => {
  es.push(r);
  if (!minSize || es.length >= +minSize) next(es.slice(maxSize * -1));
};
