import pipe from './pipe';
import distinctUntilKeyChanged from './distinctUntilKeyChanged';
import tap from './tap';

describe('operators - distinctUntilKeyChanged', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should distinctUntilKeyChanged', () => {
    const fn = setup(distinctUntilKeyChanged('post_id'));
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
    const fn = setup(
      distinctUntilKeyChanged(
        'post_title',
        (a, b) => a.substr(0, 3) === b.substr(0, 3),
      ),
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
