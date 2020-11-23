import pipe from './pipe';
import map from './map';
import tap from './tap';

describe('operators - map', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should map', () => {
    const fn = setup(map(({ post_id }) => post_id !== 10));

    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith(false);
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith(true);
  });
});
