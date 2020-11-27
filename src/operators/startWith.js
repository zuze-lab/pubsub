import { callThenable } from './utils';
export default m => next => (
  callThenable(typeof m === 'function' ? m() : m, next), next
);
