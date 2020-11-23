import pipe from './pipe';
import stack from './stack';
import tap from './tap';

describe('operators - stack', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should stack', () => {
    const fn = setup(stack());

    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 10 }]);
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 10 }, { post_id: 9 }]);
    fn({ post_id: 8 });
    expect(spy).toHaveBeenCalledWith([
      { post_id: 10 },
      { post_id: 9 },
      { post_id: 8 },
    ]);
  });

  it('should stack with a min size', () => {
    const fn = setup(stack(2));
    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 10 }, { post_id: 9 }]);
    fn({ post_id: 8 });
    expect(spy).toHaveBeenCalledWith([
      { post_id: 10 },
      { post_id: 9 },
      { post_id: 8 },
    ]);
  });
});
