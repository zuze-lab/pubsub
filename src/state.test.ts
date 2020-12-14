import state, { patch } from './state';

describe('state', () => {
  it('should work', () => {
    expect(state).toBeTruthy();
  });

  it('should work without initial state', () => {
    const spy = jest.fn();
    const container = state();
    container.setState('jim');
    expect(container.getState()).toBe('jim');
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

  it('should NOT call a subscriber if the state has not changed', () => {
    const spy = jest.fn();
    const container = state({ a: 'b' });
    container.subscribe(spy);
    spy.mockClear();
    container.setState(initial => initial);
    expect(spy).not.toHaveBeenCalled();
    container.setState(initial => ({ ...initial }));
    expect(spy).toHaveBeenCalled();
  });

  it('should patch', () => {
    const spy = jest.fn();
    const container = state({ a: 'b', c: 'd' });
    container.subscribe(spy);
    spy.mockClear();
    container.setState(patch({ a: 'd' }));
    expect(spy).toHaveBeenCalledWith({ a: 'd', c: 'd' });
  });
});
