import { createPipe, distinctUntilChanged, tap } from './index';

describe('operators - distinctUntilChanged', () => {
  let spy: jest.Mock;
  type Post = { post_id: number; key?: number; comments?: [string, string] };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should distinctUntilChanged', () => {
    const fn = pipe(distinctUntilChanged(), tap(spy));
    const ten = { post_id: 10 };
    const nine = { post_id: 9 };
    fn(ten);
    fn(nine);
    fn(ten);
    fn(nine);
    expect(spy).toHaveBeenCalledTimes(4);
    spy.mockClear();
    fn(ten);
    fn(ten);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should distinct with a custom comparator', () => {
    const comparator = (a: Post, b: Post) => a.key === b.key;
    const fn = pipe(distinctUntilChanged(comparator), tap(spy));
    fn({ post_id: 10, key: 1 });
    fn({ post_id: 9, key: 2 });
    fn({ post_id: 8, key: 1 });
    fn({ post_id: 7, key: 2 });
    expect(spy).toHaveBeenCalledTimes(4);
    spy.mockClear();
    fn({ post_id: 8, key: 1 });
    fn({ post_id: 7, key: 1 });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
