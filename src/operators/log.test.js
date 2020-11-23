import pipe from './pipe';
import log from './log';

describe('operators - log', () => {
  let spy;
  beforeEach(() => (spy = jest.spyOn(console, 'log').mockImplementation()));
  const setup = (...operators) => pipe(...operators);

  it('should log', () => {
    const fn = setup(log());

    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith({ post_id: 10 });
  });
});
