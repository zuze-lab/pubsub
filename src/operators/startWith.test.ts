import { createPipe, tap, startWith } from './index';

describe('operators - startWith', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn<Post, any>()));

  it('should startWith', () => {
    const fn = pipe(startWith({ post_id: 9 }), tap(spy));

    expect(spy).toHaveBeenCalledWith({ post_id: 9 });
    expect(spy).toHaveBeenCalledTimes(1);
    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
