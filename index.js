export default (subscribers = {}) => ({
  subscribe(topic, subscriber) {
    const current = (subscribers[topic] = (subscribers[topic] || new Set()).add(
      subscriber,
    ));
    return () => current.delete(subscriber);
  },
  publish(topic, data, sync) {
    const call = f => (sync ? f(data) : setTimeout(() => f(data)));
    (subscribers[topic] || []).forEach(call);
  },
});

// utilities
export const filter = f => callback => event => f(event) && callback(event);
export const map = m => callback => event => callback(m(event));
export const onlyOnce = (callback, i = 0) => event => i++ || callback(event);
export const stack = (callback, events = []) => event =>
  callback((events = [...events, event]));
