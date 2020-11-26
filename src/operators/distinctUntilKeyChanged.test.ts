import { createPipe, distinctUntilKeyChanged, tap } from './index';

describe('operators - distinctUntilKeyChanged', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should distinctUntilKeyChanged', () => {
    const fn = pipe(distinctUntilKeyChanged('post_id'), tap(spy));
    fn({ post_id: 10 });
    fn({ post_id: 9 });
    fn({ post_id: 10 });
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledTimes(4);
    spy.mockClear();
    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should distinct with a custom comparator', () => {
    const fn = pipe(
      distinctUntilKeyChanged(
        'post_title',
        (a, b) => a.substr(0, 3) === b.substr(0, 3),
      ),
      tap(spy),
    );
    fn({ post_title: 'Top ten gifts' });
    fn({ post_title: 'Best ten gifts' });
    fn({ post_title: 'Top five gifts' });
    fn({ post_title: 'Best five gifts' });
    expect(spy).toHaveBeenCalledTimes(4);
    spy.mockClear();
    fn({ post_title: 'Top five gifts' });
    fn({ post_title: 'Top ten gifts' });
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
