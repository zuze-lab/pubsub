import { createPipe, tap, startWith } from './index';

jest.useFakeTimers();

const delay = <T>(r: T, by = 100) =>
  new Promise(res => setTimeout(() => res(r), by));

describe('operators - startWith', () => {
  let spy: jest.Mock;
  type Post = {
    post_id?: number;
    post_title?: string;
    comments?: [string, string];
  };
  const pipe = createPipe<Post>();
  beforeEach(() => (spy = jest.fn<Post, any>()));

  it('should startWith', () => {
    const fn = pipe(startWith({ post_id: 9 }), tap(spy));

    expect(spy).toHaveBeenCalledWith({ post_id: 9 });
    expect(spy).toHaveBeenCalledTimes(1);
    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should startWith a promise', async () => {
    const fn = pipe(startWith(delay({ post_id: 9 })), tap(spy));
    expect(spy).not.toHaveBeenCalled();
    jest.runAllTimers();
    await Promise.resolve();
    expect(spy).toHaveBeenCalledWith({ post_id: 9 });
    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should startWith a function', () => {
    const fn = pipe(
      startWith(() => ({ post_id: 9 })),
      tap(spy),
    );
    expect(spy).toHaveBeenCalledWith({ post_id: 9 });
    expect(spy).toHaveBeenCalledTimes(1);
    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should startWith an async function', async () => {
    const fn = pipe(
      startWith(async () => ({ post_id: 9 })),
      tap(spy),
    );
    expect(spy).not.toHaveBeenCalled();
    await Promise.resolve();
    expect(spy).toHaveBeenCalledWith({ post_id: 9 });
    expect(spy).toHaveBeenCalledTimes(1);
    fn({ post_id: 10 });
    expect(spy).toHaveBeenCalledWith({ post_id: 10 });
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
