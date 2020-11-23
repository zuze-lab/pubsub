import pipe from './pipe';
import delay from './delay';
import tap from './tap';

jest.useFakeTimers();

describe('operators - delay', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should delay', () => {
    const fn = setup(delay(1000));

    fn({ post_id: 10 });
    expect(spy).not.toHaveBeenCalled();
    jest.advanceTimersByTime(500);
    expect(spy).not.toHaveBeenCalledWith({ post_id: 10 });
    jest.advanceTimersByTime(500);
    expect(spy).toHaveBeenCalledWith({ post_id: 10 });
  });
});
