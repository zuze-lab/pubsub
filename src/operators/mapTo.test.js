import pubsub from '../pubsub';
import pipe from './pipe';
import mapTo from './mapTo';
import tap from './tap';

describe('operators - mapTo', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should mapTo', () => {
    subscribe('post', pipe(mapTo('joe'), tap(subscriber)));

    publish('post', { post_id: 10 });
    expect(subscriber).toHaveBeenCalledWith('joe');
    publish('post', { post_id: 9 });
    expect(subscriber).toHaveBeenCalledWith('joe');
  });
});
