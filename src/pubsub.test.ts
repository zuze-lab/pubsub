import pubsub from './';

jest.useFakeTimers();

describe('test', () => {
  type Topics = {
    user_event: {
      first_name: string;
      last_name: string;
      user_id: number;
    };
    post: {
      post_id: number;
      content: string;
    };
    comment: {
      comment_id: number;
      content: string;
      post_id: number;
    };
  };

  it('should be truthy', () => {
    expect(pubsub()).toBeTruthy();
  });

  it('should publish', () => {
    const bus = pubsub<Topics>();
    expect(() =>
      bus.publish('post', {
        post_id: 10,
        content: 'test',
      }),
    ).not.toThrow();
  });

  it('should publish with a subscriber', () => {
    const bus = pubsub<Topics>();
    const subscriber = jest.fn();
    bus.subscribe('comment', subscriber);
    const comment = { comment_id: 10, content: 'fred', post_id: 12 };
    bus.publish('comment', comment);
    expect(subscriber).toHaveBeenCalledWith(comment);
  });

  it('should unsubscribe', () => {
    const bus = pubsub<Topics>();
    const subscriber = jest.fn();
    const unsub = bus.subscribe('user_event', subscriber);
    unsub();
    const user = { first_name: 'freddie', last_name: 'mercury', user_id: 10 };
    bus.publish('user_event', user);
    expect(subscriber).not.toHaveBeenCalled();
  });
});
