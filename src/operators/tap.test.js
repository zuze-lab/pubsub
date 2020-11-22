import pubsub from '../pubsub';
import pipe from './pipe';
import tap from './tap';

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
    subscribe('post', pipe(tap(spy)));
    publish('post', { post_id: 10 });
    publish('post', { post_id: 9 });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
