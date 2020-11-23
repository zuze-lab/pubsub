import pubsub from '../pubsub';
import pipe from './pipe';
import log from './log';

describe('operators - log', () => {
  let publish, subscribe, spy;
  beforeEach(() => {
    const bus = pubsub();
    publish = bus.publish;
    subscribe = bus.subscribe;
    spy = jest.spyOn(console, 'log').mockImplementation();
  });

  it('should log', () => {
    subscribe('post', pipe(log()));

    publish('post', { post_id: 10 });
    expect(spy).toHaveBeenCalledWith({ post_id: 10 });
  });
});
