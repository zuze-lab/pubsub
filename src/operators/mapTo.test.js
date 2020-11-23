import pipe from './pipe';
import mapTo from './mapTo';
import tap from './tap';

describe('operators - mapTo', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should mapTo', () => {
    const fn = setup(mapTo('joe'));

    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith('joe');
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith('joe');
  });
});
