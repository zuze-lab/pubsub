import { array, shallow, unordered } from './index';

describe('shallow', () => {
  it('should work', () => {
    const o1 = {
      jim: 'bill',
      fred: 'joe',
    };

    const o2 = {
      fred: 'joe',
      jim: 'bill',
    };

    const o3 = {
      bill: 'jim',
      joe: 'fred',
    };

    const compare = shallow<Record<string, string>>();
    expect(compare(o1, o2)).toBe(true);
    expect(compare(o2, o3)).toBe(false);
  });
});

describe('array', () => {
  it('should work', () => {
    const a = [1, 2, 3];
    const b = [1, 2, 3];

    const compare = array<number[]>();
    expect(compare(a, b)).toBe(true);
    expect(compare(a, [1, ...b])).toBe(false);
  });
});

describe('unordered', () => {
  it('should work', () => {
    const a = [1, 2, 3];
    const b = [3, 2, 1];
    const compare = unordered<number[]>();
    expect(compare(a, b)).toBe(true);
    expect(compare(a, [1, ...b])).toBe(false);
  });
});
