import pipeable from './pipeable';
import filter from './filter';

export default (promise, canCall = true) => (
  promise.then(() => (canCall = !canCall)), pipeable(filter(() => canCall))
);
