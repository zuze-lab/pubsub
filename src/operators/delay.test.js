import pubsub from '../pubsub';
import pipe from './pipe';
import delay from './delay';
import tap from './tap';

jest.useFakeTimers();

describe('operators - delay', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should delay', () => {
    subscribe('post', pipe(delay(1000), tap(subscriber)));

    publish('post', { post_id: 10 });
    expect(subscriber).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(subscriber).not.toHaveBeenCalledWith({ post_id: 10 });
    jest.advanceTimersByTime(500);
    expect(subscriber).toHaveBeenCalledWith({ post_id: 10 });
  });
});
