import pubsub from '../pubsub';
import pipe from '../pipe';
import pipeable from './pipeable';
import distinctUntilKeyChanged from './distinctUntilKeyChanged';

describe('operators - distinctUntilKeyChanged', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should distinctUntilKeyChanged', () => {
    subscribe(
      'post',
      pipe(distinctUntilKeyChanged('post_id'), pipeable(subscriber)),
    );
    publish('post', { post_id: 10 });
    publish('post', { post_id: 9 });
    publish('post', { post_id: 10 });
    publish('post', { post_id: 9 });
    expect(subscriber).toHaveBeenCalledTimes(4);
    subscriber.mockClear();
    publish('post', { post_id: 10 });
    publish('post', { post_id: 10 });
    expect(subscriber).toHaveBeenCalledTimes(1);
  });

  it('should distinct with a custom comparator', () => {
    const comparator = (a, b) => a.key === b.key;
    subscribe(
      'post',
      pipe(
        distinctUntilKeyChanged(
          'post_title',
          (a, b) => a.substr(0, 3) === b.substr(0, 3),
        ),
        pipeable(subscriber),
      ),
    );
    publish('post', { post_title: 'Top ten gifts' });
    publish('post', { post_title: 'Best ten gifts' });
    publish('post', { post_title: 'Top five gifts' });
    publish('post', { post_title: 'Best five gifts' });
    expect(subscriber).toHaveBeenCalledTimes(4);
    subscriber.mockClear();
    publish('post', { post_title: 'Top five gifts' });
    publish('post', { post_title: 'Top ten gifts' });
    expect(subscriber).toHaveBeenCalledTimes(1);
  });
});
