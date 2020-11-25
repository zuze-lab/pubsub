export default () => {
  const subscribers = {};
  return {
    subscribe(topic, subscriber) {
      const current = (subscribers[topic] = (
        subscribers[topic] || new Set()
      ).add(subscriber));
      return () => current.delete(subscriber);
    },
    publish(topic, data) {
      const call = f => f(data);
      (subscribers[topic] || []).forEach(call);
    },
  };
};
