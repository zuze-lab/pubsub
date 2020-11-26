import { createPipe, filter, tap } from './index';

describe('operators - filter', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should filter', () => {
    const fn = pipe(
      filter(({ post_id }) => post_id !== 10),
      tap(spy),
    );

    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalled();
  });
});
