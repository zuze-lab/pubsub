import pubsub from './pubsub';

jest.useFakeTimers();

describe('test', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  afterEach(() => {
    subscriber.mockClear();
  });

  it('should publish', () => {
    expect(() =>
      publish('post', {
        post_id: 10,
        content: 'test',
      }),
    ).not.toThrow();
  });

  it('should publish with a subscriber', () => {
    subscribe('comment', subscriber);
    const comment = { comment_id: 10, content: 'fred', post_id: 12 };
    publish('comment', comment);
    expect(subscriber).toHaveBeenCalledWith(comment);
  });

  it('should unsubscribe', () => {
    const unsub = subscribe('user_event', subscriber);
    unsub();
    const user = { first_name: 'freddie', last_name: 'mercury', user_id: 10 };
    publish('user_event', user);
    expect(subscriber).not.toHaveBeenCalled();
  });
});
