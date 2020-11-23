import pipe from './pipe';
import filter from './filter';
import tap from './tap';

describe('operators - filter', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should filter', () => {
    const fn = setup(filter(({ post_id }) => post_id !== 10));

    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalled();
  });
});
