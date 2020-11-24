import pipe from './pipe';

export default fn => (...args) => next =>
  pipe.apply(
    null,
    fn(...args).concat(() => next),
  );
