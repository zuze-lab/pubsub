import pubsub from './pubsub';

// like react setState
// usage: setState(patch({ key: 'value' }))
export const patch = data => initial => ({ ...initial, ...data });

export default initial => {
  const p = pubsub();
  return {
    getState: () => initial,
    setState: data => {
      const next = typeof data === 'function' ? data(initial) : data;
      initial !== next && p.publish((initial = next));
    },
    subscribe: subscriber => (subscriber(initial), p.subscribe(subscriber)),
  };
};
