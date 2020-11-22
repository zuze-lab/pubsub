import { interrupt } from './utils';

export default by =>
  interrupt((c, ...args) => setTimeout(() => c(...args), by));
