import { createPipe, bufferCount, tap } from './index';

describe('operators - bufferCount', () => {
  let spy: jest.Mock;
  type Post = { post_id: number; comments?: [string, string] };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should bufferCount', () => {
    // with no arguments this acts identially to stack
    const fn = pipe(bufferCount(), tap(spy));

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
    const fn = pipe(bufferCount(2), tap(spy));

    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 10 }, { post_id: 9 }]);
    fn({ post_id: 8 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 9 }, { post_id: 8 }]);
  });

  it('should buffer count with an every', () => {
    const fn = pipe(bufferCount(2, 2), tap(spy));

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
