import pubsub from '../pubsub';
import pipe from '../pipe';
import map from './map';
import pipeable from './pipeable';

describe('operators - map', () => {
  let publish, subscribe;
  let subscriber;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    subscriber = jest.fn();
  });

  it('should map', () => {
    subscribe(
      'post',
      pipe(
        map(({ post_id }) => post_id !== 10),
        pipeable(subscriber),
      ),
    );

    publish('post', { post_id: 10 });
    expect(subscriber).toHaveBeenCalledWith(false);
    publish('post', { post_id: 9 });
    expect(subscriber).toHaveBeenCalledWith(true);
  });
});
