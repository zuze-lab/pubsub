import pubsub from '../pubsub';
import pipe from './pipe';
import debounce from './debounce';
import tap from './tap';

jest.useFakeTimers();

describe('operators - debounce', () => {
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

  it('should debounce', () => {
    subscribe('post', pipe(debounce(), tap(subscriber)));
    publish('post', { post_id: 10 });
    publish('post', { post_id: 9 });
    publish('post', { post_id: 9 });
    publish('post', { post_id: 9 });
    expect(subscriber).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  it('should debounce with a timeout', () => {
    subscribe('post', pipe(debounce(100), tap(subscriber)));
    publish('post', { post_id: 10 });
    publish('post', { post_id: 9 });
    publish('post', { post_id: 9 });
    setTimeout(() => publish('post', { post_id: 9 }), 101);
    expect(subscriber).not.toHaveBeenCalled(); // subscribe is debounced by 100
    jest.advanceTimersByTime(100);
    expect(subscriber).toHaveBeenCalledTimes(1); // it should run once
    jest.advanceTimersByTime(100);
    expect(subscriber).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(100);
    expect(subscriber).toHaveBeenCalledTimes(2);
  });
});
