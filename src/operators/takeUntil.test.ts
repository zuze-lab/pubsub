import { createPipe, takeUntil, tap } from './index';

// jest.useFakeTimers();

describe('operators - takeUntil', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should takeUntil', async () => {
    const p = new Promise(res => res());
    const fn = pipe(takeUntil(p), tap(spy));

    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockClear();
    await Promise.resolve();
    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
  });
});
