import { createPipe, log, tap } from './index';

describe('operators - log', () => {
  let spy: jest.SpyInstance;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.spyOn(console, 'log').mockImplementation()));

  it('should log', () => {
    const fn = pipe(log());

    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith({ post_id: 10 });
  });
});
