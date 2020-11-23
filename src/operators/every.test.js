import pipe from './pipe';
import every from './every';
import tap from './tap';

describe('operators - every', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should every', () => {
    const fn = setup(every(2));

    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith({ post_id: 9 });
  });
});
