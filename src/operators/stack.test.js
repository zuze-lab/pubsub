import pubsub from '../pubsub';
import pipe from './pipe';
import stack from './stack';
import tap from './tap';

describe('operators - stack', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should stack', () => {
    subscribe('post', pipe(stack(), tap(subscriber)));

    publish('post', { post_id: 10 });
    expect(subscriber).toHaveBeenCalledWith([{ post_id: 10 }]);
    publish('post', { post_id: 9 });
    expect(subscriber).toHaveBeenCalledWith([{ post_id: 10 }, { post_id: 9 }]);
    publish('post', { post_id: 8 });
    expect(subscriber).toHaveBeenCalledWith([
      { post_id: 10 },
      { post_id: 9 },
      { post_id: 8 },
    ]);
  });

  it('should stack with a min size', () => {
    subscribe('post', pipe(stack(2), tap(subscriber)));
    publish('post', { post_id: 10 });
    expect(subscriber).not.toHaveBeenCalled();
    publish('post', { post_id: 9 });
    expect(subscriber).toHaveBeenCalledWith([{ post_id: 10 }, { post_id: 9 }]);
    publish('post', { post_id: 8 });
    expect(subscriber).toHaveBeenCalledWith([
      { post_id: 10 },
      { post_id: 9 },
      { post_id: 8 },
    ]);
  });
});
