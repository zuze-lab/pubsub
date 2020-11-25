export default (by, leading, canCall = true, to) => next => r => {
  if (leading && canCall) next(r);
  canCall = false;
  clearTimeout(to);
  to = setTimeout(() => {
    canCall = true;
    leading || next(r);
  }, by);
};
