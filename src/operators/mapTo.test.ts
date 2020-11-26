import { tap, createPipe, mapTo } from './index';

describe('operators - mapTo', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should mapTo', () => {
    const fn = pipe(mapTo('joe'), tap(spy));

    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith('joe');
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith('joe');
  });
});
