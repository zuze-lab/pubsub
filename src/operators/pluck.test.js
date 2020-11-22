import pubsub from '../pubsub';
import pipe from '../pipe';
import pluck from './pluck';
import pipeable from './pipeable';

describe('operators - pluck', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should pluck', () => {
    subscribe('post', pipe(pluck('post_id'), pipeable(subscriber)));

    publish('post', { post_id: 10 });
    expect(subscriber).toHaveBeenCalledWith(10);
    publish('post', { post_id: 9 });
    expect(subscriber).toHaveBeenCalledWith(9);
  });

  it('should pluck nested', () => {
    subscribe('post', pipe(pluck('comments', '0'), pipeable(subscriber)));

    publish('post', {
      post_id: 10,
      comments: ['first comment on 10', 'second comment'],
    });
    expect(subscriber).toHaveBeenCalledWith('first comment on 10');
  });
});
