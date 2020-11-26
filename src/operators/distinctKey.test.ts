import { createPipe, distinctKey, tap } from './index';

describe('operators - distinct', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should distinctKey', () => {
    const fn = pipe(distinctKey('post_id'), tap(spy));
    fn({ post_id: 10 });
    fn({ post_id: 9 });
    fn({ post_id: 10 });
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should distinct with a custom comparator', () => {
    const fn = pipe(
      distinctKey('post_title', (a, b) => a.substr(0, 3) === b.substr(0, 3)),
      tap(spy),
    );
    fn({ post_title: 'Top ten gifts' });
    fn({ post_title: 'Top five gifts' });
    fn({ post_title: 'Best ten gifts' });
    fn({ post_title: 'Best five gifts' });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
