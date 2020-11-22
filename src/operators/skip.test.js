import pubsub from '../pubsub';
import pipe from './pipe';
import skip from './skip';
import tap from './tap';

describe('operators - skip', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should skip', () => {
    subscribe('post', pipe(skip(2), tap(subscriber)));

    publish('post', { post_id: 10 });
    publish('post', { post_id: 10 });
    expect(subscriber).not.toHaveBeenCalled();
    publish('post', { post_id: 10 });
    publish('post', { post_id: 10 });
    expect(subscriber).toHaveBeenCalledTimes(2);
  });
});
