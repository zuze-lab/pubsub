import pipeable from './pipeable';
import map from './map';
import distinctUntilChanged from './distinctUntilChanged';
import { compare } from './utils';

const createSelector = comparator => (...fns) =>
  pipeable(
    map(input => fns.map(f => f(input))),
    distinctUntilChanged((a, b) =>
      a.every((m, i) => compare(comparator, m, b[i])),
    ),
    map(fns.pop()),
  );

export const select = createSelector();

export default createSelector;
