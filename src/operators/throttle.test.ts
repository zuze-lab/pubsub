import { createPipe, throttle, tap } from './index';

jest.useFakeTimers();

describe('operators - throttle', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn()));

  it('should throttle', () => {
    const fn = pipe(throttle(1), tap(spy));
    fn({ post_id: 10 });
    fn({ post_id: 9 });
    fn({ post_id: 9 });
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should throttle with a timeout', () => {
    const fn = pipe(throttle(100), tap(spy));
    fn({ post_id: 10 });
    fn({ post_id: 9 });
    fn({ post_id: 9 });
    setTimeout(() => fn({ post_id: 9 }), 101);
    expect(spy).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
