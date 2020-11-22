import pubsub from '../pubsub';
import pipe from './pipe';
import filter from './filter';
import tap from './tap';

describe('operators - filter', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should filter', () => {
    subscribe(
      'post',
      pipe(
        filter(({ post_id }) => post_id !== 10),
        tap(subscriber),
      ),
    );

    publish('post', { post_id: 10 });
    expect(subscriber).not.toHaveBeenCalled();
    publish('post', { post_id: 9 });
    expect(subscriber).toHaveBeenCalled();
  });
});
