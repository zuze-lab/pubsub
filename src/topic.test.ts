import topic, { mqttMatcher } from './topic';

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
    expect(topic()).toBeTruthy();
  });

  it('should publish', () => {
    const bus = topic<Topics>();
    expect(() =>
      bus.publish('post', {
        post_id: 10,
        content: 'test',
      }),
    ).not.toThrow();
  });

  it('should publish with a subscriber', () => {
    const bus = topic<Topics>();
    const subscriber = jest.fn();
    bus.subscribe('comment', subscriber);
    const comment = { comment_id: 10, content: 'fred', post_id: 12 };
    bus.publish('comment', comment);
    expect(subscriber).toHaveBeenCalledWith({
      topic: 'comment',
      data: comment,
    });
  });

  it('should unsubscribe', () => {
    const bus = topic<Topics>();
    const subscriber = jest.fn();
    const unsub = bus.subscribe('user_event', subscriber);
    unsub();
    const user = { first_name: 'freddie', last_name: 'mercury', user_id: 10 };
    bus.publish('user_event', user);
    expect(subscriber).not.toHaveBeenCalled();
  });

  it('should retain', () => {
    const bus = topic<Topics>();
    const subscriber = jest.fn();
    const post = { post_id: 7, content: 'test' };
    bus.publish('post', post, true);
    bus.subscribe('post', subscriber);
    expect(subscriber).toHaveBeenCalledWith({ topic: 'post', data: post });
    const sub2 = jest.fn();
    bus.subscribe('user_event', sub2);
    expect(sub2).not.toHaveBeenCalled();
  });
});

describe('mqttMatcher', () => {
  it('should match straight up', () => {
    expect(mqttMatcher('first/second/third', 'first/second/third')).toBe(true);

    expect(mqttMatcher('first/second/fourth', 'first/second/third')).not.toBe(
      true,
    );
  });

  it('should match single level wildcards', () => {
    expect(mqttMatcher('first/second/third', 'first/+/third')).toBe(true);
    expect(mqttMatcher('first/second/third/fourth', 'first/+/third')).not.toBe(
      true,
    );
    expect(
      mqttMatcher('first/second/third/fourth', 'first/+/+/fourth'),
    ).not.toBe(true);
  });

  it('should match multi-level wildcards', () => {
    expect(mqttMatcher('first/second/third', 'first/second/#')).toBe(true);

    expect(mqttMatcher('first/second/third', 'first/#')).toBe(true);
    expect(mqttMatcher('first/second/third', 'second/#')).not.toBe(true);
  });
});
