import { interrupt } from './utils';

export default fn =>
  interrupt((c, ...args) => {
    fn(...args);
    c(...args);
  });
