import { createPipe, take, tap } from './index';

describe('operators - take', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should take', () => {
    const fn = pipe(take(2), tap(spy));

    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockClear();
    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
  });
});
