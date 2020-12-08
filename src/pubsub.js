export default () => {
  const subscribers = new Set();
  return {
    subscribe: subscriber => (
      subscribers.add(subscriber), () => subscribers.delete(subscriber)
    ),
    publish: data => subscribers.forEach(c => c(data)),
  };
};
