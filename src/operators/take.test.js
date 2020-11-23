import pipe from './pipe';
import take from './take';
import tap from './tap';

describe('operators - take', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should take', () => {
    const fn = setup(take(2));

    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockClear();
    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
  });
});
