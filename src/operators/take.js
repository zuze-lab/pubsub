import { interrupt } from './utils';

export default (times, count = 0) =>
  interrupt((c, ...args) => ++count <= times && c(...args));
