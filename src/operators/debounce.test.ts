import { createPipe, debounce, tap } from './index';

jest.useFakeTimers();

describe('operators - debounce', () => {
  let spy: jest.Mock;
  type Post = { post_id: number; comments?: [string, string] };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should debounce', () => {
    const fn = pipe(debounce(1), tap(spy));
    fn({ post_id: 10 });
    fn({ post_id: 10 });
    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should debounce with a timeout', () => {
    const fn = pipe(debounce(100), tap(spy));
    fn({ post_id: 10 });
    fn({ post_id: 10 });
    fn({ post_id: 9 });
    setTimeout(() => fn({ post_id: 9 }), 101);
    expect(spy).not.toHaveBeenCalled(); // subscribe is debounced by 100
    jest.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(1); // it should run once
    jest.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should debounce leading with a timeout', () => {
    const fn = pipe(debounce(1, true), tap(spy));
    fn({ post_id: 10 });
    fn({ post_id: 10 });
    fn({ post_id: 9 });
    setTimeout(() => fn({ post_id: 9 }), 101);
    expect(spy).toHaveBeenCalled(); // subscribe is debounced by 100, but called the first time
    jest.advanceTimersByTime(102);
    expect(spy).toHaveBeenCalledTimes(2); // second call should happen immediately (leading)
  });
});
