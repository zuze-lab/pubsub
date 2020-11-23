import pipe from './pipe';
import count from './count';
import tap from './tap';

describe('operators - count', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should count', () => {
    const fn = setup(count());

    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith([0, { post_id: 10 }]);
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith([1, { post_id: 9 }]);
  });

  it('should count with a startAt', () => {
    const fn = setup(count(5));

    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith([5, { post_id: 10 }]);
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith([6, { post_id: 9 }]);
  });
});
