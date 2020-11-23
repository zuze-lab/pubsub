import pipe from './pipe';
import pairwise from './pairwise';
import tap from './tap';

describe('operators - pairwise', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should pairwise', () => {
    const fn = setup(pairwise());

    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 10 }, { post_id: 9 }]);
    fn({ post_id: 8 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 9 }, { post_id: 8 }]);
  });
});
