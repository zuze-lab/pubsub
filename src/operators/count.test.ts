import { tap, count, createPipe } from './index';

describe('operators - count', () => {
  let spy: jest.Mock;
  type Post = { post_id: number; comments?: [string, string] };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should count', () => {
    const fn = pipe(count(), tap(spy));

    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith([0, { post_id: 10 }]);
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith([1, { post_id: 9 }]);
  });

  it('should count with a startAt', () => {
    const fn = pipe(count(5), tap(spy));

    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith([5, { post_id: 10 }]);
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith([6, { post_id: 9 }]);
  });
});
