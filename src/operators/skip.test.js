import pubsub from '../pubsub';
import pipe from '../pipe';
import skip from './skip';
import pipeable from './pipeable';

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
    subscribe('post', pipe(skip(2), pipeable(subscriber)));

    publish('post', { post_id: 10 });
    publish('post', { post_id: 10 });
    expect(subscriber).not.toHaveBeenCalled();
    publish('post', { post_id: 10 });
    publish('post', { post_id: 10 });
    expect(subscriber).toHaveBeenCalledTimes(2);
  });
});
