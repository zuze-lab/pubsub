import { createPipe, skipWhile, tap } from './index';

describe('operators - skipWhile', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should skipWhile', () => {
    let thing = true;

    const fn = pipe(
      skipWhile(() => thing),
      tap(spy),
    );

    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    thing = false;
    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
