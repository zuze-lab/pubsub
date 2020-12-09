import pubsub from './pubsub';

const matcher = (a, b) => a === b;

export const mqttMatcher = (topic, t) =>
  new RegExp(`^${t.replace(/\+/, '[^/]+?').replace(/#/, '.*')}$`).test(topic);

export default test => {
  const p = pubsub();
  return {
    publish: (topic, data) => p.publish({ topic, data }),
    subscribe: (t, callback) =>
      p.subscribe(
        ({ topic, data }) => (test || matcher)(topic, t) && callback(data),
      ),
  };
};
