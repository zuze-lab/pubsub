import { interrupt } from './utils';

export default f => interrupt((c, ...args) => f(...args) && c(...args));
