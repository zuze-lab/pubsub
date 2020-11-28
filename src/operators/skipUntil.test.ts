import { createPipe, skipUntil, tap } from './index';

describe('operators - skipUntil', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should skipUntil', async () => {
    const p = new Promise(res => res());
    const fn = pipe(skipUntil(p), tap(spy));

    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    await Promise.resolve();
    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
