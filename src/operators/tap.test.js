import pubsub from '../pubsub';
import pipe from '../pipe';
import tap from './tap';
import pipeable from './pipeable';

describe('operators - tap', () => {
  let publish, subscribe;
  let spy;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    spy = jest.fn();
    subscriber = jest.fn();
  });

  it('should tap', () => {
    subscribe('post', pipe(tap(spy), pipeable(subscriber)));
    publish('post', { post_id: 10 });
    publish('post', { post_id: 9 });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(subscriber).toHaveBeenCalledWith({ post_id: 10 });
    expect(subscriber).toHaveBeenCalledWith({ post_id: 9 });
  });
});
