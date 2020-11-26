import { createPipe, skip, tap } from './index';

describe('operators - skip', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should skip', () => {
    const fn = pipe(skip(2), tap(spy));

    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
