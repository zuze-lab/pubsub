import pubsub from './pubsub';

const isPlainObject = o =>
  Object.prototype.toString.call(o) === '[object Object]';

// like react setState
const patchTransformer = (a, initial) =>
  typeof a === 'function'
    ? a(initial)
    : isPlainObject(a)
    ? Object.assign({}, initial, a)
    : a;

export default (initial, transformer) => {
  const p = pubsub();
  return {
    getState: () => initial,
    setState: data =>
      p.publish((initial = (transformer || patchTransformer)(data, initial))),
    subscribe: subscriber => (subscriber(initial), p.subscribe(subscriber)),
  };
};
