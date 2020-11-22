import pubsub from '../pubsub';
import pipe from '../pipe';
import bufferCount from './bufferCount';
import pipeable from './pipeable';

describe('operators - bufferCount', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should bufferCount', () => {
    // with no arguments this acts identially to stack
    subscribe('post', pipe(bufferCount(), pipeable(subscriber)));

    publish('post', { post_id: 10 });
    publish('post', { post_id: 9 });
    publish('post', { post_id: 8 });
    expect(subscriber).toHaveBeenCalledWith([
      { post_id: 10 },
      { post_id: 9 },
      { post_id: 8 },
    ]);
  });

  it('should bufferCount with a bufferSize', () => {
    subscribe('post', pipe(bufferCount(2), pipeable(subscriber)));

    publish('post', { post_id: 10 });
    expect(subscriber).not.toHaveBeenCalled();
    publish('post', { post_id: 9 });
    expect(subscriber).toHaveBeenCalledWith([{ post_id: 10 }, { post_id: 9 }]);
    publish('post', { post_id: 8 });
    expect(subscriber).toHaveBeenCalledWith([{ post_id: 9 }, { post_id: 8 }]);
  });

  it('should buffer count with an every', () => {
    subscribe('post', pipe(bufferCount(2, 2), pipeable(subscriber)));

    publish('post', { post_id: 10 });
    expect(subscriber).not.toHaveBeenCalled();
    publish('post', { post_id: 9 });
    expect(subscriber).toHaveBeenCalledWith([{ post_id: 10 }, { post_id: 9 }]);
    subscriber.mockClear();
    publish('post', { post_id: 8 });
    expect(subscriber).not.toHaveBeenCalled();
    publish('post', { post_id: 7 });
    expect(subscriber).toHaveBeenCalledWith([{ post_id: 8 }, { post_id: 7 }]);
  });
});
