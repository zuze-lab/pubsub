import pubsub from './pubsub';

const matcher = (a, b) => a === b;

export const mqttMatcher = (topic, t) =>
  new RegExp(`^${t.replace(/\+/, '[^/]+?').replace(/#/, '.*')}$`).test(topic);

export default test => {
  const p = pubsub();
  const cache = {};
  return {
    publish: (topic, data, retain) => {
      if (retain) cache[topic] = data;
      return p.publish({ topic, data });
    },
    subscribe: (t, callback) => {
      Object.keys(cache).forEach(
        k => (test || matcher)(k, t) && callback({ data: cache[k], topic: k }),
      );
      return p.subscribe(
        ({ topic, data }) =>
          (test || matcher)(topic, t) && callback({ data, topic }),
      );
    },
  };
};
