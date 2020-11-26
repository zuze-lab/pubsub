import { createPipe, stack, tap } from './index';

describe('operators - stack', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should stack', () => {
    const fn = pipe(stack(), tap(spy));

    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 10 }]);
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 10 }, { post_id: 9 }]);
    fn({ post_id: 8 });
    expect(spy).toHaveBeenCalledWith([
      { post_id: 10 },
      { post_id: 9 },
      { post_id: 8 },
    ]);
  });

  it('should stack with a min size', () => {
    const fn = pipe(stack(2), tap(spy));
    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 10 }, { post_id: 9 }]);
    fn({ post_id: 8 });
    expect(spy).toHaveBeenCalledWith([
      { post_id: 10 },
      { post_id: 9 },
      { post_id: 8 },
    ]);
  });

  it('should stack with a max size', () => {
    const fn = pipe(stack(2, 1), tap(spy));
    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 9 }]);
    fn({ post_id: 8 });
    expect(spy).toHaveBeenCalledWith([{ post_id: 8 }]);
  });
});
