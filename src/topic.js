import pubsub from './pubsub';
import { pipe, filter, map } from './operators/index';

const matcher = (a, b) => a === b;

export const mqttMatcher = (topic, t) =>
  new RegExp(`^${t.replace(/\+/, '[^/]+?').replace(/#/, '.*')}$`).test(topic);

export default test => {
  const p = pubsub();
  return {
    publish: (topic, data) => p.publish({ topic, data }),
    subscribe: (t, callback) =>
      p.subscribe(
        pipe(
          filter(({ topic }) => (test || matcher)(topic, t)),
          map(({ data }) => data),
          () => callback,
        ),
      ),
  };
};
