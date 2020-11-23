import pubsub from '../pubsub';
import pipe from './pipe';
import distinctUntilChanged from './distinctUntilChanged';
import tap from './tap';

describe('operators - distinctUntilChanged', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should distinctUntilChanged', () => {
    const fn = setup(distinctUntilChanged());
    const ten = { post_id: 10 };
    const nine = { post_id: 9 };
    fn(ten);
    fn(nine);
    fn(ten);
    fn(nine);
    expect(spy).toHaveBeenCalledTimes(4);
    spy.mockClear();
    fn(ten);
    fn(ten);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should distinct with a custom comparator', () => {
    const comparator = (a, b) => a.key === b.key;
    const fn = setup(distinctUntilChanged(comparator));
    fn({ post_id: 10, key: 1 });
    fn({ post_id: 9, key: 2 });
    fn({ post_id: 8, key: 1 });
    fn({ post_id: 7, key: 2 });
    expect(spy).toHaveBeenCalledTimes(4);
    spy.mockClear();
    fn({ post_id: 8, key: 1 });
    fn({ post_id: 7, key: 1 });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
