import { createPipe, single, tap } from './index';

describe('operators - single', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should single', () => {
    const fn = pipe(single(), tap(spy));

    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockClear();
    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
  });
});
