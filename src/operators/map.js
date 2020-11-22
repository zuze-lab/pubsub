import { interrupt } from './utils';
export default m => interrupt((c, ...args) => c(m(...args)));
