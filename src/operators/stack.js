import { interrupt } from './utils';

export default (minSize, maxSize) => {
  const es = [];

  return interrupt((c, ...args) => {
    es.push(...args);
    if (!minSize || es.length >= +minSize) c(es.slice(maxSize * -1));
  });
};
