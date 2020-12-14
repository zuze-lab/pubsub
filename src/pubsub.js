export default opts => {
  const { cacheSize = 0 } = opts || {};
  const cache = [];
  const subscribers = new Set();
  return {
    subscribe: subscriber => {
      cache.forEach(subscriber);
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },
    publish: data => {
      if (cacheSize) cache.splice(0, cache.length - cacheSize, data);
      subscribers.forEach(c => c(data));
    },
  };
};
