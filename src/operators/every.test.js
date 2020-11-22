import pubsub from '../pubsub';
import pipe from '../pipe';
import every from './every';
import pipeable from './pipeable';

describe('operators - every', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should every', () => {
    subscribe('post', pipe(every(2), pipeable(subscriber)));

    publish('post', { post_id: 10 });
    expect(subscriber).not.toHaveBeenCalled();
    publish('post', { post_id: 9 });
    expect(subscriber).toHaveBeenCalledWith({ post_id: 9 });
  });
});
