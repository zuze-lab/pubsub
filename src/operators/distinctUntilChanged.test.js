import pubsub from '../pubsub';
import pipe from './pipe';
import distinctUntilChanged from './distinctUntilChanged';
import tap from './tap';

describe('operators - distinctUntilChanged', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should distinctUntilChanged', () => {
    subscribe('post', pipe(distinctUntilChanged(), tap(subscriber)));
    const ten = { post_id: 10 };
    const nine = { post_id: 9 };
    publish('post', ten);
    publish('post', nine);
    publish('post', ten);
    publish('post', nine);
    expect(subscriber).toHaveBeenCalledTimes(4);
    subscriber.mockClear();
    publish('post', ten);
    publish('post', ten);
    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  it('should distinct with a custom comparator', () => {
    const comparator = (a, b) => a.key === b.key;
    subscribe('post', pipe(distinctUntilChanged(comparator), tap(subscriber)));
    publish('post', { post_id: 10, key: 1 });
    publish('post', { post_id: 9, key: 2 });
    publish('post', { post_id: 8, key: 1 });
    publish('post', { post_id: 7, key: 2 });
    expect(subscriber).toHaveBeenCalledTimes(4);
    subscriber.mockClear();
    publish('post', { post_id: 8, key: 1 });
    publish('post', { post_id: 7, key: 1 });
    expect(subscriber).toHaveBeenCalledTimes(1);
  });
});
