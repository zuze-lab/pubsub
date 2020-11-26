import { createPipe, pairwise, tap } from './index';

describe('operators - pairwise', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should pairwise', () => {
    const fn = pipe(pairwise(), tap(spy));

    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 10 }, { post_id: 9 }]);
    fn({ post_id: 8 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 9 }, { post_id: 8 }]);
  });
});
