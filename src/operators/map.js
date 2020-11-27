import { callThenable } from './utils';

export default m => next => r => callThenable(m(r), next);
