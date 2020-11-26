import { createPipe, delay, tap } from './index';

jest.useFakeTimers();

describe('operators - delay', () => {
  let spy: jest.Mock;
  type Post = { post_id: number; comments?: [string, string] };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should delay', () => {
    const fn = pipe(delay(1000), tap(spy));

    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(spy).not.toHaveBeenCalledWith({ post_id: 10 });
    jest.advanceTimersByTime(500);
    expect(spy).toHaveBeenCalledWith({ post_id: 10 });
  });
});
