import pubsub from '../pubsub';
import pipe from '../pipe';
import distinct from './distinct';
import pipeable from './pipeable';

describe('operators - distinct', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should distinct', () => {
    subscribe('post', pipe(distinct(), pipeable(subscriber)));
    const ten = { post_id: 10 };
    const nine = { post_id: 9 };
    publish('post', ten);
    publish('post', nine);
    publish('post', ten);
    publish('post', nine);
    expect(subscriber).toHaveBeenCalledTimes(2);
  });

  it('should distinct with a custom comparator', () => {
    const comparator = (a, b) => a.key === b.key;
    subscribe('post', pipe(distinct(comparator), pipeable(subscriber)));
    publish('post', { post_id: 10, key: 1 });
    publish('post', { post_id: 9, key: 1 });
    publish('post', { post_id: 8, key: 1 });
    publish('post', { post_id: 7, key: 1 });
    expect(subscriber).toHaveBeenCalledTimes(1);
  });
});
