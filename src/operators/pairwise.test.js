import pubsub from '../pubsub';
import pipe from './pipe';
import pairwise from './pairwise';
import tap from './tap';

describe('operators - pairwise', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should pairwise', () => {
    subscribe('post', pipe(pairwise(), tap(subscriber)));

    publish('post', { post_id: 10 });
    expect(subscriber).not.toHaveBeenCalled();
    publish('post', { post_id: 9 });
    expect(subscriber).toHaveBeenCalledWith([{ post_id: 10 }, { post_id: 9 }]);
    publish('post', { post_id: 8 });
    expect(subscriber).toHaveBeenCalledWith([{ post_id: 9 }, { post_id: 8 }]);
  });
});
