import { createPipe, tap } from './index';

describe('operators - tap', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should tap', () => {
    const fn = pipe(tap(spy));
    fn({ post_id: 10 });
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
