import pubsub from '../pubsub';
import pipe from './pipe';
import count from './count';
import tap from './tap';

describe('operators - count', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should count', () => {
    subscribe('post', pipe(count(), tap(subscriber)));

    publish('post', { post_id: 10 });
    expect(subscriber).toHaveBeenCalledWith(0, { post_id: 10 });
    publish('post', { post_id: 9 });
    expect(subscriber).toHaveBeenCalledWith(1, { post_id: 9 });
  });

  it('should count with a startAt', () => {
    subscribe('post', pipe(count(5), tap(subscriber)));

    publish('post', { post_id: 10 });
    expect(subscriber).toHaveBeenCalledWith(5, { post_id: 10 });
    publish('post', { post_id: 9 });
    expect(subscriber).toHaveBeenCalledWith(6, { post_id: 9 });
  });
});
