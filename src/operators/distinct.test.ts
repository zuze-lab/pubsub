import { createPipe, distinct, tap } from './index';

describe('operators - distinct', () => {
  let spy: jest.Mock;
  type Post = { post_id: number; key?: number; comments?: [string, string] };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should distinct', () => {
    const fn = pipe(distinct(), tap(spy));
    const ten = { post_id: 10 };
    const nine = { post_id: 9 };
    fn(ten);
    fn(nine);
    fn(ten);
    fn(nine);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should distinct with a custom comparator', () => {
    const fn = pipe(
      distinct((a, b) => a.key === b.key),
      tap(spy),
    );
    fn({ post_id: 10, key: 1 });
    fn({ post_id: 9, key: 1 });
    fn({ post_id: 8, key: 1 });
    fn({ post_id: 7, key: 1 });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
