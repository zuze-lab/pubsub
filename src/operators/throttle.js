import filter from './filter';
import pipeable from './pipeable';

export default (by, canCall = true) =>
  pipeable(
    filter(() => {
      setTimeout(() => (canCall = true), by);
      const shouldCall = canCall;
      canCall = false;
      return shouldCall;
    }),
  );
