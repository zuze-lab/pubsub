import pipe from './pipe';
import throttle from './throttle';
import tap from './tap';

jest.useFakeTimers();

describe('operators - throttle', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should throttle', () => {
    const fn = setup(throttle());
    fn({ post_id: 10 });
    fn({ post_id: 9 });
    fn({ post_id: 9 });
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should throttle with a timeout', () => {
    const fn = setup(throttle(100));
    fn({ post_id: 10 });
    fn({ post_id: 9 });
    fn({ post_id: 9 });
    setTimeout(() => fn({ post_id: 9 }), 101);
    expect(spy).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
