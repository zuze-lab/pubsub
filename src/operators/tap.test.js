import pipe from './pipe';
import tap from './tap';

describe('operators - tap', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should tap', () => {
    const fn = setup();
    fn({ post_id: 10 });
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
