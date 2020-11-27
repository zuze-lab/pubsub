export default m => next => {
  const f = typeof m === 'function' ? m() : m;
  typeof f.then === 'function' ? f.then(next) : next(f);
  return next;
};
