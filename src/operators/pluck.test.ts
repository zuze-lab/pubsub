import { createPipe, pluck, tap } from './index';

describe('operators - pluck', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should pluck', () => {
    const fn = pipe(pluck('post_id'), tap(spy));

    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith(10);
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith(9);
  });

  it('should pluck nested', () => {
    const fn = pipe(pluck('comments', '0'), tap(spy));

    fn({
      post_id: 10,
      comments: ['first comment on 10', 'second comment'],
    });
    expect(spy).toHaveBeenCalledWith('first comment on 10');
  });
});
