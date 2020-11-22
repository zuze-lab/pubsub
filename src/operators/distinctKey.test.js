import pubsub from '../pubsub';
import pipe from './pipe';
import distinctKey from './distinctKey';
import tap from './tap';

describe('operators - distinct', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should distinctKey', () => {
    subscribe('post', pipe(distinctKey('post_id'), tap(subscriber)));
    publish('post', { post_id: 10 });
    publish('post', { post_id: 9 });
    publish('post', { post_id: 10 });
    publish('post', { post_id: 9 });
    expect(subscriber).toHaveBeenCalledTimes(2);
  });

  it('should distinct with a custom comparator', () => {
    subscribe(
      'post',
      pipe(
        distinctKey('post_title', (a, b) => a.substr(0, 3) === b.substr(0, 3)),
        tap(subscriber),
      ),
    );
    publish('post', { post_title: 'Top ten gifts' });
    publish('post', { post_title: 'Top five gifts' });
    publish('post', { post_title: 'Best ten gifts' });
    publish('post', { post_title: 'Best five gifts' });
    expect(subscriber).toHaveBeenCalledTimes(2);
  });
});
