import { createPipe, select, tap } from './index';

describe('operators - select', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  beforeEach(() => (spy = jest.fn()));

  it('should select', () => {
    const pipe = createPipe<Post>();
    const fn = pipe(
      select(
        ({ post_id }) => post_id,
        ([post_id]) => ({ key: post_id }),
      ),
      tap(spy),
    );

    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(1);
    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(1);
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
