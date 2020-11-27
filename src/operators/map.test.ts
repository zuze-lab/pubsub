import { createPipe, map, tap } from './index';

describe('operators - map', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should map', () => {
    const fn = pipe(
      map(({ post_id }) => post_id !== 10),
      tap(spy),
    );

    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith(false);
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should map async', async () => {
    const fn = pipe(
      map(async ({ post_id }) => post_id !== 10),
      tap(spy),
    );

    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    await Promise.resolve();
    expect(spy).toHaveBeenCalledWith(false);

    spy.mockClear();
    fn({ post_id: 9 });
    expect(spy).not.toHaveBeenCalled();
    await Promise.resolve();
    expect(spy).toHaveBeenCalledWith(true);
    fn({});
  });
});
