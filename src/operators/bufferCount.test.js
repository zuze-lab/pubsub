import pipe from './pipe';
import bufferCount from './bufferCount';
import tap from './tap';

describe('operators - bufferCount', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should bufferCount', () => {
    // with no arguments this acts identially to stack
    const fn = setup(bufferCount());

    fn({ post_id: 10 });
    fn({ post_id: 9 });
    fn({ post_id: 8 });
    expect(spy).toHaveBeenCalledWith([
      { post_id: 10 },
      { post_id: 9 },
      { post_id: 8 },
    ]);
  });

  it('should bufferCount with a bufferSize', () => {
    const fn = setup(bufferCount(2));

    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 10 }, { post_id: 9 }]);
    fn({ post_id: 8 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 9 }, { post_id: 8 }]);
  });

  it('should buffer count with an every', () => {
    const fn = setup(bufferCount(2, 2));

    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 10 }, { post_id: 9 }]);
    spy.mockClear();
    fn({ post_id: 8 });
    expect(spy).not.toHaveBeenCalled();
    fn({ post_id: 7 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 8 }, { post_id: 7 }]);
  });
});
