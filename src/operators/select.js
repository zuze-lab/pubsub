import pipeable from './pipeable';
import map from './map';
import distinctUntilChanged from './distinctUntilChanged';

const createSelector = (comparator = (a, b) => a === b) => (...fns) =>
  pipeable(
    map(input => fns.map(f => f(input))),
    distinctUntilChanged((a, b) => a.every((m, i) => comparator(m, b[i]))),
    map(fns.pop()),
  );

export const select = createSelector();

export default createSelector;
