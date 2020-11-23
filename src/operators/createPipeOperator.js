import pipe from './pipe';

export default fn => (...operatorArgs) => next =>
  pipe.apply(
    null,
    fn(...operatorArgs).concat(() => next),
  );
