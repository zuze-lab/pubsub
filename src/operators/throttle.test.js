import pubsub from '../pubsub';
import pipe from './pipe';
import throttle from './throttle';
import tap from './tap';

jest.useFakeTimers();

describe('operators - throttle', () => {
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

  it('should throttle', () => {
    subscribe('post', pipe(throttle(), tap(subscriber)));
    publish('post', { post_id: 10 });
    publish('post', { post_id: 9 });
    publish('post', { post_id: 9 });
    publish('post', { post_id: 9 });
    expect(subscriber).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  it('should throttle with a timeout', () => {
    subscribe('post', pipe(throttle(100), tap(subscriber)));
    publish('post', { post_id: 10 });
    publish('post', { post_id: 9 });
    publish('post', { post_id: 9 });
    setTimeout(() => publish('post', { post_id: 9 }), 101);
    expect(subscriber).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(subscriber).toHaveBeenCalledTimes(2);
  });
});
