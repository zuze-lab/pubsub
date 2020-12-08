import state from './state';

describe('state', () => {
  it('should work', () => {
    expect(state).toBeTruthy();
  });

  it('should work without initial state', () => {
    const spy = jest.fn();
    const container = state();
    container.setState('jim');
  });

  it('should get state', () => {
    const spy = jest.fn();
    const container = state(2);
    expect(container.getState()).toBe(2);
  });

  it('should work without type', () => {
    const spy = jest.fn();
    const container = state(2);
    container.subscribe(spy);
    expect(spy).toHaveBeenCalledWith(2);
    spy.mockClear();
    container.setState(4);
    expect(spy).toHaveBeenCalledWith(4);
  });
});
