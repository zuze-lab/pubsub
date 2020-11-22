import { interrupt } from './utils';

export default (startAt = 0) =>
  interrupt((c, ...args) => c(startAt++, ...args));
