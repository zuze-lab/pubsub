import pipe from './pipe';
import distinct from './distinct';
import tap from './tap';

describe('operators - distinct', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should distinct', () => {
    const fn = setup(distinct());
    const ten = { post_id: 10 };
    const nine = { post_id: 9 };
    fn(ten);
    fn(nine);
    fn(ten);
    fn(nine);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should distinct with a custom comparator', () => {
    const fn = setup(distinct((a, b) => a.key === b.key));
    fn({ post_id: 10, key: 1 });
    fn({ post_id: 9, key: 1 });
    fn({ post_id: 8, key: 1 });
    fn({ post_id: 7, key: 1 });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
