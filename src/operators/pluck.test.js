import pipe from './pipe';
import pluck from './pluck';
import tap from './tap';

describe('operators - pluck', () => {
  let spy;
  beforeEach(() => (spy = jest.fn()));
  const setup = (...operators) => pipe(...operators, tap(spy));

  it('should pluck', () => {
    const fn = setup(pluck('post_id'));

    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith(10);
    fn({ post_id: 9 });
    expect(spy).toHaveBeenCalledWith(9);
  });

  it('should pluck nested', () => {
    const fn = setup(pluck('comments', '0'));

    fn({
      post_id: 10,
      comments: ['first comment on 10', 'second comment'],
    });
    expect(spy).toHaveBeenCalledWith('first comment on 10');
  });
});
