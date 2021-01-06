import { createPipe, takeWhile, tap } from './index';

describe('operators - takeWhile', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should takeWhile', () => {
    let thing = true;

    const fn = pipe(
      takeWhile(() => thing),
      tap(spy),
    );

    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockClear();
    thing = false;
    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
  });
});
