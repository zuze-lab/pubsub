import pipe from '../pipe';
import pipeable from './pipeable';

export const interrupt = c => callback => (...args) => c(callback, ...args);

export const pipeableInterrupt = (...s) => callback =>
  pipe(...s, pipeable(callback));
