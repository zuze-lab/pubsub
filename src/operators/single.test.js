import pubsub from '../pubsub';
import pipe from '../pipe';
import single from './single';
import pipeable from './pipeable';

describe('operators - single', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should single', () => {
    subscribe('post', pipe(single(), pipeable(subscriber)));

    publish('post', { post_id: 10 });
    publish('post', { post_id: 10 });
    expect(subscriber).toHaveBeenCalledTimes(1);
    subscriber.mockClear();
    publish('post', { post_id: 10 });
    publish('post', { post_id: 10 });
    expect(subscriber).not.toHaveBeenCalled();
  });
});
