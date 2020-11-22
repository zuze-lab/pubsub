import pubsub from '../pubsub';
import pipe from './pipe';
import take from './take';
import tap from './tap';

describe('operators - take', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should take', () => {
    subscribe('post', pipe(take(2), tap(subscriber)));

    publish('post', { post_id: 10 });
    publish('post', { post_id: 10 });
    expect(subscriber).toHaveBeenCalledTimes(2);
    subscriber.mockClear();
    publish('post', { post_id: 10 });
    publish('post', { post_id: 10 });
    expect(subscriber).not.toHaveBeenCalled();
  });
});
